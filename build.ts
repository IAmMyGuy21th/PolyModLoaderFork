import { readdirSync, mkdirSync, cpSync, renameSync, rmSync, writeFileSync } from "fs";
import { dirname } from "path";
import { execFileSync } from "child_process";
import { globSync } from "glob";
import * as esbuild from "esbuild";

const versions = readdirSync("./src");

for (const v of versions) {
  if (v.startsWith("_")) continue;

  const outdir = `dist/${v}`;
  const entry = `src/${v}/main.mod.ts`;

  // Build JS bundle
  await esbuild.build({
    entryPoints: [entry],
    outdir,
    bundle: true,
    format: "esm",
    minify: false,
  });

  // Generate .d.ts files via tsc. We can't pass the entry file directly
  // alongside a project config (tsc disallows mixing --project with file
  // args, and *without* --project it ignores tsconfig.json entirely,
  // silently dropping the `paths` aliases). So we generate a throwaway
  // tsconfig that extends the real one and run tsc -p against that.
  const tmpTsconfigPath = `${outdir}/.tsconfig.dts.json`;
  mkdirSync(outdir, { recursive: true });
  writeFileSync(
    tmpTsconfigPath,
    JSON.stringify({
      extends: "../../tsconfig.json", // relative to outdir -> project root
      compilerOptions: {
        rootDir: `../../src/${v}`,
        outDir: ".",
      },
      include: [`../../src/${v}/**/*.ts`],
    })
  );

  execFileSync("npx", ["tsc", "-p", tmpTsconfigPath], { stdio: "inherit" });
  rmSync(tmpTsconfigPath);

  // tsc may still nest output under dist/<v>/<v>/... depending on how
  // main.mod.ts imports things outside its own rootDir. Sweep it flat,
  // same idea as the original Bun script's cleanup step:
  const nestedDtsFiles = globSync("**/*.d.ts", { cwd: outdir });
  for (const file of nestedDtsFiles) {
    if (!file.startsWith(`${v}/`)) continue;
    const src = `${outdir}/${file}`;
    const dest = `${outdir}/${file.slice(v.length + 1)}`;
    mkdirSync(dirname(dest), { recursive: true });
    renameSync(src, dest);
  }
  rmSync(`${outdir}/${v}`, { recursive: true, force: true });

  // Copy JSON/asset files
  const assets = globSync("**/*.{json,svg,png}", { cwd: `src/${v}` });
  for (const file of assets) {
    const dest = `${outdir}/${file}`;
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(`src/${v}/${file}`, dest);
  }
}
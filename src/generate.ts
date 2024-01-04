import axios from "axios";
import chalk from "chalk";
import { Project, ScriptTarget } from "ts-morph";
import { columnsToType } from "../src/columnsToType.js";
import { stringToClass } from "../src/stringFns.js";
import { Schema } from "./types.js";

const project = new Project({
  compilerOptions: {
    target: ScriptTarget.ESNext,
  },
});

interface Args {
  apiKey?: string;
  output?: string;
}

export const generate = async (argv: Args) => {
  const defaultOutput = "./SandDBClients.ts";
  console.log(chalk.blue("Generating SandDB clients..."));
  const apiKey = process.env.SANDDB_API_KEY ?? argv.apiKey;
  if (!apiKey) {
    throw new Error(
      "Cannot generate SandDB clients as you're missing a SANDDB_API_KEY environment variable."
    );
  }

  // Load schema.
  try {
    const result = await axios.get<Schema>("https://api.sand-db.com/schemas", {
      params: {
        apiKey,
      },
    });

    const pipelines = result.data.pipelines;

    const sourceFile = project.createSourceFile(
      argv.output ?? defaultOutput,
      "",
      {
        overwrite: true,
      }
    );
    sourceFile.addImportDeclaration({
      moduleSpecifier: "@sanddb/client",
      namedImports: ["SandDBClient"],
    });

    // Loop through each pipeline in the schema.
    pipelines.map((pipeline) => {
      console.log(
        chalk.blue(`Generating SandDB client for pipeline "${pipeline.name}"`)
      );
      const pipelineName = stringToClass(pipeline.name);
      const dataInterfaceName = `${pipelineName}Schema`;

      // Add the pipeline data interface.
      const interfaceDeclaration = sourceFile.addInterface({
        name: dataInterfaceName,
        isExported: true,
      });

      // Add the pipeline client class.
      const classDeclaration = sourceFile.addClass({
        name: `${pipelineName}Client`,
        isExported: true,
        extends: `SandDBClient<${dataInterfaceName}>`,
      });
      classDeclaration.addProperties([
        {
          name: "endpoint",
          type: "string",
          initializer: `"${pipeline.endpoint}"`,
          isReadonly: true,
        },
        {
          name: "versionNumber",
          type: "number",
          initializer: `${pipeline.version}`,
          isReadonly: true,
        },
        {
          name: "pipelineId",
          type: "string",
          initializer: `"${pipeline.id}"`,
          isReadonly: true,
        },
      ]);
      classDeclaration.addConstructor({
        parameters: [
          {
            name: "apiKey?",
            type: "string",
          },
        ],
        statements: ["super(apiKey);"],
      });

      columnsToType(pipeline.columns, interfaceDeclaration);
    });
    await project.save();
  } catch (err) {
    throw new Error("Failed to load your schemas from SandDB");
  }
};

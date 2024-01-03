import { SandDBClient } from "./BaseClient.js";

export class GenericSandDBClient extends SandDBClient {
  protected readonly endpoint: string;
  protected readonly versionNumber: number;
  protected readonly pipelineId: string;

  constructor(
    apiKey: string,
    endpoint: string,
    versionNumber: number,
    pipelineId: string
  ) {
    super(apiKey);
    this.endpoint = endpoint;
    this.versionNumber = versionNumber;
    this.pipelineId = pipelineId;
  }
}

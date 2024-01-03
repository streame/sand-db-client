import axios from "axios";
import { QueryArgument } from "./QueryArgument.js";

export abstract class SandDBClient<T = unknown> {
  protected abstract endpoint: string;
  protected abstract versionNumber: number;
  protected abstract pipelineId: string;
  protected apiKey: string;

  constructor(apiKey?: string) {
    if (!apiKey && !process.env.SANDDB_API_KEY) {
      throw new Error("No API key provided");
    }
    this.apiKey = apiKey ?? process.env.SANDDB_API_KEY!;
  }

  public async insert(data: T[]): Promise<void> {
    try {
      await axios.post(this.sandDBUrl, data, {
        params: {
          apiKey: this.apiKey,
        },
      });
    } catch (err) {
      console.error(err);
      throw new Error("Failed to insert data into SandDB");
    }
  }

  public async query(query: QueryArgument<T>): Promise<T[]> {
    try {
      const result = await axios.get<T[]>(this.sandDBUrl, {
        params: {
          query,
          apiKey: this.apiKey,
        },
      });
      return result.data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to query data from SandDB");
    }
  }

  private get sandDBUrl(): string {
    return `${this.endpoint}/v${this.versionNumber}/${this.pipelineId}`;
  }
}

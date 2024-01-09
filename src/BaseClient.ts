import axios from "axios";
import { GroupByArgument } from "./GroupByArgument.js";
import { QueryArgument } from "./QueryArgument.js";
import { QueryResult } from "./QueryResult.js";

export abstract class SandDBClient<T> {
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

  public async query(query: QueryArgument<T>): Promise<QueryResult<T>> {
    try {
      const result = await axios.get<QueryResult<T>>(this.sandDBUrl, {
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

  public async rawQuery<U = T>(query: string): Promise<QueryResult<U>> {
    try {
      const result = await axios.get<QueryResult<U>>(`${this.sandDBUrl}/raw`, {
        params: {
          query,
          apiKey: this.apiKey,
        },
      });
      return result.data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to raw query data from SandDB");
    }
  }

  public async groupBy(query: GroupByArgument<T>): Promise<QueryResult<T>> {
    return this.query(query);
  }

  private get sandDBUrl(): string {
    return `${this.endpoint}/v${this.versionNumber}/${this.pipelineId}`;
  }
}

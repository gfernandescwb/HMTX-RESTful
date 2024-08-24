import dotenv from 'dotenv';

class ServeConfig {
  protected port: number;

  constructor() {
    this.port = parseInt(process.env.PORT || "3000");
    this.initDependencies();
  }

  private initDependencies() {
    dotenv.config();
  }

  public get config() {
    return {
      port: this.port,
    };
  }
}

export default ServeConfig;

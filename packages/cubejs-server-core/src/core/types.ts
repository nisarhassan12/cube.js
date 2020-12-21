import { Request as ExpressRequest } from 'express';
import { CheckAuthFn, CheckAuthMiddlewareFn, QueryTransformerFn } from '@cubejs-backend/api-gateway';
import { RedisPoolOptions } from '@cubejs-backend/query-orchestrator';

export interface QueueOptions {
  concurrency?: number;
  continueWaitTimeout?: number;
  executionTimeout?: number;
  orphanedTimeout?: number;
  heartBeatInterval?: number;
}

export interface QueryCacheOptions {
  refreshKeyRenewalThreshold?: number;
  backgroundRenew?: boolean;
  queueOptions?: QueueOptions;
}

export interface PreAggregationsOptions {
  queueOptions?: QueueOptions;
  externalRefresh?: boolean;
}

export interface OrchestratorOptions {
  redisPrefix?: string;
  redisPoolOptions?: RedisPoolOptions;
  queryCacheOptions?: QueryCacheOptions;
  preAggregationsOptions?: PreAggregationsOptions;
  rollupOnlyMode?: boolean;
}

export interface RequestContext {
  authInfo: any;
  requestId: string;
}

export interface DriverContext extends RequestContext {
  dataSource: string;
}

export interface FileContent {
  fileName: string;
  content: string;
}

export interface SchemaFileRepository {
  dataSchemaFiles: () => Promise<FileContent[]>;
}

export interface DriverFactory {}

export type DatabaseType =
  | 'athena'
  | 'bigquery'
  | 'clickhouse'
  | 'druid'
  | 'jdbc'
  | 'hive'
  | 'mongobi'
  | 'mssql'
  | 'mysql'
  | 'elasticsearch'
  | 'awselasticsearch'
  | 'oracle'
  | 'postgres'
  | 'prestodb'
  | 'redshift'
  | 'snowflake'
  | 'sqlite';

export interface CreateOptions {
  dbType?: DatabaseType | ((context: RequestContext) => DatabaseType);
  externalDbType?: DatabaseType | ((context: RequestContext) => DatabaseType);
  schemaPath?: string;
  basePath?: string;
  devServer?: boolean;
  apiSecret?: string;
  logger?: (msg: string, params: any) => void;
  driverFactory?: (context: DriverContext) => any;
  dialectFactory?: (context: DriverContext) => any;
  externalDriverFactory?: (context: RequestContext) => any;
  externalDialectFactory?: (context: RequestContext) => any;
  contextToAppId?: (context: RequestContext) => string;
  contextToOrchestratorId?: (context: RequestContext) => string;
  repositoryFactory?: (context: RequestContext) => SchemaFileRepository;
  checkAuthMiddleware?: CheckAuthMiddlewareFn;
  checkAuth?: CheckAuthFn;
  queryTransformer?: QueryTransformerFn;
  preAggregationsSchema?: String | ((context: RequestContext) => string);
  schemaVersion?: (context: RequestContext) => string;
  extendContext?: (req: ExpressRequest) => any;
  scheduledRefreshTimer?: boolean | number;
  scheduledRefreshTimeZones?: string[];
  scheduledRefreshContexts?: () => Promise<any>;
  scheduledRefreshConcurrency?: number;
  compilerCacheSize?: number;
  maxCompilerCacheKeepAlive?: number;
  updateCompilerCacheKeepAlive?: boolean;
  telemetry?: boolean;
  allowUngroupedWithoutPrimaryKey?: boolean;
  orchestratorOptions?: OrchestratorOptions | ((context: RequestContext) => OrchestratorOptions);
  allowJsDuplicatePropsInSchema?: boolean;
  // @deprecated Use contextToOrchestratorId instead.
  contextToDataSourceId?: any;
}
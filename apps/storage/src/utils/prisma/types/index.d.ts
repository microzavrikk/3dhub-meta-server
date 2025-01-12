
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ThirdModel
 * 
 */
export type ThirdModel = $Result.DefaultSelection<Prisma.$ThirdModelPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ThirdModels
 * const thirdModels = await prisma.thirdModel.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ThirdModels
   * const thirdModels = await prisma.thirdModel.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.thirdModel`: Exposes CRUD operations for the **ThirdModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ThirdModels
    * const thirdModels = await prisma.thirdModel.findMany()
    * ```
    */
  get thirdModel(): Prisma.ThirdModelDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.1.0
   * Query Engine version: 11f085a2012c0f4778414c8db2651556ee0ef959
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ThirdModel: 'ThirdModel'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "thirdModel"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ThirdModel: {
        payload: Prisma.$ThirdModelPayload<ExtArgs>
        fields: Prisma.ThirdModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ThirdModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThirdModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ThirdModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThirdModelPayload>
          }
          findFirst: {
            args: Prisma.ThirdModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThirdModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ThirdModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThirdModelPayload>
          }
          findMany: {
            args: Prisma.ThirdModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThirdModelPayload>[]
          }
          create: {
            args: Prisma.ThirdModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThirdModelPayload>
          }
          createMany: {
            args: Prisma.ThirdModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ThirdModelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThirdModelPayload>[]
          }
          delete: {
            args: Prisma.ThirdModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThirdModelPayload>
          }
          update: {
            args: Prisma.ThirdModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThirdModelPayload>
          }
          deleteMany: {
            args: Prisma.ThirdModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ThirdModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ThirdModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThirdModelPayload>
          }
          aggregate: {
            args: Prisma.ThirdModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateThirdModel>
          }
          groupBy: {
            args: Prisma.ThirdModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<ThirdModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.ThirdModelCountArgs<ExtArgs>
            result: $Utils.Optional<ThirdModelCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ThirdModel
   */

  export type AggregateThirdModel = {
    _count: ThirdModelCountAggregateOutputType | null
    _avg: ThirdModelAvgAggregateOutputType | null
    _sum: ThirdModelSumAggregateOutputType | null
    _min: ThirdModelMinAggregateOutputType | null
    _max: ThirdModelMaxAggregateOutputType | null
  }

  export type ThirdModelAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type ThirdModelSumAggregateOutputType = {
    fileSize: number | null
  }

  export type ThirdModelMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    fileKey: string | null
    bucketName: string | null
    fileSize: number | null
    fileType: string | null
    uploadDate: Date | null
    updatedAt: Date | null
    ownerId: string | null
    publicAccess: boolean | null
    thumbnailUrl: string | null
  }

  export type ThirdModelMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    fileKey: string | null
    bucketName: string | null
    fileSize: number | null
    fileType: string | null
    uploadDate: Date | null
    updatedAt: Date | null
    ownerId: string | null
    publicAccess: boolean | null
    thumbnailUrl: string | null
  }

  export type ThirdModelCountAggregateOutputType = {
    id: number
    name: number
    description: number
    fileKey: number
    bucketName: number
    fileSize: number
    fileType: number
    uploadDate: number
    updatedAt: number
    tags: number
    ownerId: number
    publicAccess: number
    thumbnailUrl: number
    metadata: number
    _all: number
  }


  export type ThirdModelAvgAggregateInputType = {
    fileSize?: true
  }

  export type ThirdModelSumAggregateInputType = {
    fileSize?: true
  }

  export type ThirdModelMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    fileKey?: true
    bucketName?: true
    fileSize?: true
    fileType?: true
    uploadDate?: true
    updatedAt?: true
    ownerId?: true
    publicAccess?: true
    thumbnailUrl?: true
  }

  export type ThirdModelMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    fileKey?: true
    bucketName?: true
    fileSize?: true
    fileType?: true
    uploadDate?: true
    updatedAt?: true
    ownerId?: true
    publicAccess?: true
    thumbnailUrl?: true
  }

  export type ThirdModelCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    fileKey?: true
    bucketName?: true
    fileSize?: true
    fileType?: true
    uploadDate?: true
    updatedAt?: true
    tags?: true
    ownerId?: true
    publicAccess?: true
    thumbnailUrl?: true
    metadata?: true
    _all?: true
  }

  export type ThirdModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ThirdModel to aggregate.
     */
    where?: ThirdModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThirdModels to fetch.
     */
    orderBy?: ThirdModelOrderByWithRelationInput | ThirdModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ThirdModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThirdModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThirdModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ThirdModels
    **/
    _count?: true | ThirdModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ThirdModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ThirdModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ThirdModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ThirdModelMaxAggregateInputType
  }

  export type GetThirdModelAggregateType<T extends ThirdModelAggregateArgs> = {
        [P in keyof T & keyof AggregateThirdModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateThirdModel[P]>
      : GetScalarType<T[P], AggregateThirdModel[P]>
  }




  export type ThirdModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThirdModelWhereInput
    orderBy?: ThirdModelOrderByWithAggregationInput | ThirdModelOrderByWithAggregationInput[]
    by: ThirdModelScalarFieldEnum[] | ThirdModelScalarFieldEnum
    having?: ThirdModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ThirdModelCountAggregateInputType | true
    _avg?: ThirdModelAvgAggregateInputType
    _sum?: ThirdModelSumAggregateInputType
    _min?: ThirdModelMinAggregateInputType
    _max?: ThirdModelMaxAggregateInputType
  }

  export type ThirdModelGroupByOutputType = {
    id: string
    name: string
    description: string | null
    fileKey: string
    bucketName: string
    fileSize: number
    fileType: string
    uploadDate: Date
    updatedAt: Date
    tags: string[]
    ownerId: string
    publicAccess: boolean
    thumbnailUrl: string | null
    metadata: JsonValue | null
    _count: ThirdModelCountAggregateOutputType | null
    _avg: ThirdModelAvgAggregateOutputType | null
    _sum: ThirdModelSumAggregateOutputType | null
    _min: ThirdModelMinAggregateOutputType | null
    _max: ThirdModelMaxAggregateOutputType | null
  }

  type GetThirdModelGroupByPayload<T extends ThirdModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ThirdModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ThirdModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ThirdModelGroupByOutputType[P]>
            : GetScalarType<T[P], ThirdModelGroupByOutputType[P]>
        }
      >
    >


  export type ThirdModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    fileKey?: boolean
    bucketName?: boolean
    fileSize?: boolean
    fileType?: boolean
    uploadDate?: boolean
    updatedAt?: boolean
    tags?: boolean
    ownerId?: boolean
    publicAccess?: boolean
    thumbnailUrl?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["thirdModel"]>

  export type ThirdModelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    fileKey?: boolean
    bucketName?: boolean
    fileSize?: boolean
    fileType?: boolean
    uploadDate?: boolean
    updatedAt?: boolean
    tags?: boolean
    ownerId?: boolean
    publicAccess?: boolean
    thumbnailUrl?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["thirdModel"]>

  export type ThirdModelSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    fileKey?: boolean
    bucketName?: boolean
    fileSize?: boolean
    fileType?: boolean
    uploadDate?: boolean
    updatedAt?: boolean
    tags?: boolean
    ownerId?: boolean
    publicAccess?: boolean
    thumbnailUrl?: boolean
    metadata?: boolean
  }


  export type $ThirdModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ThirdModel"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      fileKey: string
      bucketName: string
      fileSize: number
      fileType: string
      uploadDate: Date
      updatedAt: Date
      tags: string[]
      ownerId: string
      publicAccess: boolean
      thumbnailUrl: string | null
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["thirdModel"]>
    composites: {}
  }

  type ThirdModelGetPayload<S extends boolean | null | undefined | ThirdModelDefaultArgs> = $Result.GetResult<Prisma.$ThirdModelPayload, S>

  type ThirdModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ThirdModelFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ThirdModelCountAggregateInputType | true
    }

  export interface ThirdModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ThirdModel'], meta: { name: 'ThirdModel' } }
    /**
     * Find zero or one ThirdModel that matches the filter.
     * @param {ThirdModelFindUniqueArgs} args - Arguments to find a ThirdModel
     * @example
     * // Get one ThirdModel
     * const thirdModel = await prisma.thirdModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ThirdModelFindUniqueArgs>(args: SelectSubset<T, ThirdModelFindUniqueArgs<ExtArgs>>): Prisma__ThirdModelClient<$Result.GetResult<Prisma.$ThirdModelPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ThirdModel that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ThirdModelFindUniqueOrThrowArgs} args - Arguments to find a ThirdModel
     * @example
     * // Get one ThirdModel
     * const thirdModel = await prisma.thirdModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ThirdModelFindUniqueOrThrowArgs>(args: SelectSubset<T, ThirdModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ThirdModelClient<$Result.GetResult<Prisma.$ThirdModelPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ThirdModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThirdModelFindFirstArgs} args - Arguments to find a ThirdModel
     * @example
     * // Get one ThirdModel
     * const thirdModel = await prisma.thirdModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ThirdModelFindFirstArgs>(args?: SelectSubset<T, ThirdModelFindFirstArgs<ExtArgs>>): Prisma__ThirdModelClient<$Result.GetResult<Prisma.$ThirdModelPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ThirdModel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThirdModelFindFirstOrThrowArgs} args - Arguments to find a ThirdModel
     * @example
     * // Get one ThirdModel
     * const thirdModel = await prisma.thirdModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ThirdModelFindFirstOrThrowArgs>(args?: SelectSubset<T, ThirdModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__ThirdModelClient<$Result.GetResult<Prisma.$ThirdModelPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ThirdModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThirdModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ThirdModels
     * const thirdModels = await prisma.thirdModel.findMany()
     * 
     * // Get first 10 ThirdModels
     * const thirdModels = await prisma.thirdModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const thirdModelWithIdOnly = await prisma.thirdModel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ThirdModelFindManyArgs>(args?: SelectSubset<T, ThirdModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThirdModelPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ThirdModel.
     * @param {ThirdModelCreateArgs} args - Arguments to create a ThirdModel.
     * @example
     * // Create one ThirdModel
     * const ThirdModel = await prisma.thirdModel.create({
     *   data: {
     *     // ... data to create a ThirdModel
     *   }
     * })
     * 
     */
    create<T extends ThirdModelCreateArgs>(args: SelectSubset<T, ThirdModelCreateArgs<ExtArgs>>): Prisma__ThirdModelClient<$Result.GetResult<Prisma.$ThirdModelPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ThirdModels.
     * @param {ThirdModelCreateManyArgs} args - Arguments to create many ThirdModels.
     * @example
     * // Create many ThirdModels
     * const thirdModel = await prisma.thirdModel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ThirdModelCreateManyArgs>(args?: SelectSubset<T, ThirdModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ThirdModels and returns the data saved in the database.
     * @param {ThirdModelCreateManyAndReturnArgs} args - Arguments to create many ThirdModels.
     * @example
     * // Create many ThirdModels
     * const thirdModel = await prisma.thirdModel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ThirdModels and only return the `id`
     * const thirdModelWithIdOnly = await prisma.thirdModel.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ThirdModelCreateManyAndReturnArgs>(args?: SelectSubset<T, ThirdModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThirdModelPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ThirdModel.
     * @param {ThirdModelDeleteArgs} args - Arguments to delete one ThirdModel.
     * @example
     * // Delete one ThirdModel
     * const ThirdModel = await prisma.thirdModel.delete({
     *   where: {
     *     // ... filter to delete one ThirdModel
     *   }
     * })
     * 
     */
    delete<T extends ThirdModelDeleteArgs>(args: SelectSubset<T, ThirdModelDeleteArgs<ExtArgs>>): Prisma__ThirdModelClient<$Result.GetResult<Prisma.$ThirdModelPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ThirdModel.
     * @param {ThirdModelUpdateArgs} args - Arguments to update one ThirdModel.
     * @example
     * // Update one ThirdModel
     * const thirdModel = await prisma.thirdModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ThirdModelUpdateArgs>(args: SelectSubset<T, ThirdModelUpdateArgs<ExtArgs>>): Prisma__ThirdModelClient<$Result.GetResult<Prisma.$ThirdModelPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ThirdModels.
     * @param {ThirdModelDeleteManyArgs} args - Arguments to filter ThirdModels to delete.
     * @example
     * // Delete a few ThirdModels
     * const { count } = await prisma.thirdModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ThirdModelDeleteManyArgs>(args?: SelectSubset<T, ThirdModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ThirdModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThirdModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ThirdModels
     * const thirdModel = await prisma.thirdModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ThirdModelUpdateManyArgs>(args: SelectSubset<T, ThirdModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ThirdModel.
     * @param {ThirdModelUpsertArgs} args - Arguments to update or create a ThirdModel.
     * @example
     * // Update or create a ThirdModel
     * const thirdModel = await prisma.thirdModel.upsert({
     *   create: {
     *     // ... data to create a ThirdModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ThirdModel we want to update
     *   }
     * })
     */
    upsert<T extends ThirdModelUpsertArgs>(args: SelectSubset<T, ThirdModelUpsertArgs<ExtArgs>>): Prisma__ThirdModelClient<$Result.GetResult<Prisma.$ThirdModelPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ThirdModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThirdModelCountArgs} args - Arguments to filter ThirdModels to count.
     * @example
     * // Count the number of ThirdModels
     * const count = await prisma.thirdModel.count({
     *   where: {
     *     // ... the filter for the ThirdModels we want to count
     *   }
     * })
    **/
    count<T extends ThirdModelCountArgs>(
      args?: Subset<T, ThirdModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ThirdModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ThirdModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThirdModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ThirdModelAggregateArgs>(args: Subset<T, ThirdModelAggregateArgs>): Prisma.PrismaPromise<GetThirdModelAggregateType<T>>

    /**
     * Group by ThirdModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThirdModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ThirdModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ThirdModelGroupByArgs['orderBy'] }
        : { orderBy?: ThirdModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ThirdModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetThirdModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ThirdModel model
   */
  readonly fields: ThirdModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ThirdModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ThirdModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ThirdModel model
   */ 
  interface ThirdModelFieldRefs {
    readonly id: FieldRef<"ThirdModel", 'String'>
    readonly name: FieldRef<"ThirdModel", 'String'>
    readonly description: FieldRef<"ThirdModel", 'String'>
    readonly fileKey: FieldRef<"ThirdModel", 'String'>
    readonly bucketName: FieldRef<"ThirdModel", 'String'>
    readonly fileSize: FieldRef<"ThirdModel", 'Int'>
    readonly fileType: FieldRef<"ThirdModel", 'String'>
    readonly uploadDate: FieldRef<"ThirdModel", 'DateTime'>
    readonly updatedAt: FieldRef<"ThirdModel", 'DateTime'>
    readonly tags: FieldRef<"ThirdModel", 'String[]'>
    readonly ownerId: FieldRef<"ThirdModel", 'String'>
    readonly publicAccess: FieldRef<"ThirdModel", 'Boolean'>
    readonly thumbnailUrl: FieldRef<"ThirdModel", 'String'>
    readonly metadata: FieldRef<"ThirdModel", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * ThirdModel findUnique
   */
  export type ThirdModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThirdModel
     */
    select?: ThirdModelSelect<ExtArgs> | null
    /**
     * Filter, which ThirdModel to fetch.
     */
    where: ThirdModelWhereUniqueInput
  }

  /**
   * ThirdModel findUniqueOrThrow
   */
  export type ThirdModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThirdModel
     */
    select?: ThirdModelSelect<ExtArgs> | null
    /**
     * Filter, which ThirdModel to fetch.
     */
    where: ThirdModelWhereUniqueInput
  }

  /**
   * ThirdModel findFirst
   */
  export type ThirdModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThirdModel
     */
    select?: ThirdModelSelect<ExtArgs> | null
    /**
     * Filter, which ThirdModel to fetch.
     */
    where?: ThirdModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThirdModels to fetch.
     */
    orderBy?: ThirdModelOrderByWithRelationInput | ThirdModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ThirdModels.
     */
    cursor?: ThirdModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThirdModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThirdModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ThirdModels.
     */
    distinct?: ThirdModelScalarFieldEnum | ThirdModelScalarFieldEnum[]
  }

  /**
   * ThirdModel findFirstOrThrow
   */
  export type ThirdModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThirdModel
     */
    select?: ThirdModelSelect<ExtArgs> | null
    /**
     * Filter, which ThirdModel to fetch.
     */
    where?: ThirdModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThirdModels to fetch.
     */
    orderBy?: ThirdModelOrderByWithRelationInput | ThirdModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ThirdModels.
     */
    cursor?: ThirdModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThirdModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThirdModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ThirdModels.
     */
    distinct?: ThirdModelScalarFieldEnum | ThirdModelScalarFieldEnum[]
  }

  /**
   * ThirdModel findMany
   */
  export type ThirdModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThirdModel
     */
    select?: ThirdModelSelect<ExtArgs> | null
    /**
     * Filter, which ThirdModels to fetch.
     */
    where?: ThirdModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThirdModels to fetch.
     */
    orderBy?: ThirdModelOrderByWithRelationInput | ThirdModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ThirdModels.
     */
    cursor?: ThirdModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThirdModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThirdModels.
     */
    skip?: number
    distinct?: ThirdModelScalarFieldEnum | ThirdModelScalarFieldEnum[]
  }

  /**
   * ThirdModel create
   */
  export type ThirdModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThirdModel
     */
    select?: ThirdModelSelect<ExtArgs> | null
    /**
     * The data needed to create a ThirdModel.
     */
    data: XOR<ThirdModelCreateInput, ThirdModelUncheckedCreateInput>
  }

  /**
   * ThirdModel createMany
   */
  export type ThirdModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ThirdModels.
     */
    data: ThirdModelCreateManyInput | ThirdModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ThirdModel createManyAndReturn
   */
  export type ThirdModelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThirdModel
     */
    select?: ThirdModelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ThirdModels.
     */
    data: ThirdModelCreateManyInput | ThirdModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ThirdModel update
   */
  export type ThirdModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThirdModel
     */
    select?: ThirdModelSelect<ExtArgs> | null
    /**
     * The data needed to update a ThirdModel.
     */
    data: XOR<ThirdModelUpdateInput, ThirdModelUncheckedUpdateInput>
    /**
     * Choose, which ThirdModel to update.
     */
    where: ThirdModelWhereUniqueInput
  }

  /**
   * ThirdModel updateMany
   */
  export type ThirdModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ThirdModels.
     */
    data: XOR<ThirdModelUpdateManyMutationInput, ThirdModelUncheckedUpdateManyInput>
    /**
     * Filter which ThirdModels to update
     */
    where?: ThirdModelWhereInput
  }

  /**
   * ThirdModel upsert
   */
  export type ThirdModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThirdModel
     */
    select?: ThirdModelSelect<ExtArgs> | null
    /**
     * The filter to search for the ThirdModel to update in case it exists.
     */
    where: ThirdModelWhereUniqueInput
    /**
     * In case the ThirdModel found by the `where` argument doesn't exist, create a new ThirdModel with this data.
     */
    create: XOR<ThirdModelCreateInput, ThirdModelUncheckedCreateInput>
    /**
     * In case the ThirdModel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ThirdModelUpdateInput, ThirdModelUncheckedUpdateInput>
  }

  /**
   * ThirdModel delete
   */
  export type ThirdModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThirdModel
     */
    select?: ThirdModelSelect<ExtArgs> | null
    /**
     * Filter which ThirdModel to delete.
     */
    where: ThirdModelWhereUniqueInput
  }

  /**
   * ThirdModel deleteMany
   */
  export type ThirdModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ThirdModels to delete
     */
    where?: ThirdModelWhereInput
  }

  /**
   * ThirdModel without action
   */
  export type ThirdModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThirdModel
     */
    select?: ThirdModelSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ThirdModelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    fileKey: 'fileKey',
    bucketName: 'bucketName',
    fileSize: 'fileSize',
    fileType: 'fileType',
    uploadDate: 'uploadDate',
    updatedAt: 'updatedAt',
    tags: 'tags',
    ownerId: 'ownerId',
    publicAccess: 'publicAccess',
    thumbnailUrl: 'thumbnailUrl',
    metadata: 'metadata'
  };

  export type ThirdModelScalarFieldEnum = (typeof ThirdModelScalarFieldEnum)[keyof typeof ThirdModelScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ThirdModelWhereInput = {
    AND?: ThirdModelWhereInput | ThirdModelWhereInput[]
    OR?: ThirdModelWhereInput[]
    NOT?: ThirdModelWhereInput | ThirdModelWhereInput[]
    id?: StringFilter<"ThirdModel"> | string
    name?: StringFilter<"ThirdModel"> | string
    description?: StringNullableFilter<"ThirdModel"> | string | null
    fileKey?: StringFilter<"ThirdModel"> | string
    bucketName?: StringFilter<"ThirdModel"> | string
    fileSize?: IntFilter<"ThirdModel"> | number
    fileType?: StringFilter<"ThirdModel"> | string
    uploadDate?: DateTimeFilter<"ThirdModel"> | Date | string
    updatedAt?: DateTimeFilter<"ThirdModel"> | Date | string
    tags?: StringNullableListFilter<"ThirdModel">
    ownerId?: StringFilter<"ThirdModel"> | string
    publicAccess?: BoolFilter<"ThirdModel"> | boolean
    thumbnailUrl?: StringNullableFilter<"ThirdModel"> | string | null
    metadata?: JsonNullableFilter<"ThirdModel">
  }

  export type ThirdModelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    fileKey?: SortOrder
    bucketName?: SortOrder
    fileSize?: SortOrder
    fileType?: SortOrder
    uploadDate?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
    ownerId?: SortOrder
    publicAccess?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
  }

  export type ThirdModelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ThirdModelWhereInput | ThirdModelWhereInput[]
    OR?: ThirdModelWhereInput[]
    NOT?: ThirdModelWhereInput | ThirdModelWhereInput[]
    name?: StringFilter<"ThirdModel"> | string
    description?: StringNullableFilter<"ThirdModel"> | string | null
    fileKey?: StringFilter<"ThirdModel"> | string
    bucketName?: StringFilter<"ThirdModel"> | string
    fileSize?: IntFilter<"ThirdModel"> | number
    fileType?: StringFilter<"ThirdModel"> | string
    uploadDate?: DateTimeFilter<"ThirdModel"> | Date | string
    updatedAt?: DateTimeFilter<"ThirdModel"> | Date | string
    tags?: StringNullableListFilter<"ThirdModel">
    ownerId?: StringFilter<"ThirdModel"> | string
    publicAccess?: BoolFilter<"ThirdModel"> | boolean
    thumbnailUrl?: StringNullableFilter<"ThirdModel"> | string | null
    metadata?: JsonNullableFilter<"ThirdModel">
  }, "id">

  export type ThirdModelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    fileKey?: SortOrder
    bucketName?: SortOrder
    fileSize?: SortOrder
    fileType?: SortOrder
    uploadDate?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
    ownerId?: SortOrder
    publicAccess?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: ThirdModelCountOrderByAggregateInput
    _avg?: ThirdModelAvgOrderByAggregateInput
    _max?: ThirdModelMaxOrderByAggregateInput
    _min?: ThirdModelMinOrderByAggregateInput
    _sum?: ThirdModelSumOrderByAggregateInput
  }

  export type ThirdModelScalarWhereWithAggregatesInput = {
    AND?: ThirdModelScalarWhereWithAggregatesInput | ThirdModelScalarWhereWithAggregatesInput[]
    OR?: ThirdModelScalarWhereWithAggregatesInput[]
    NOT?: ThirdModelScalarWhereWithAggregatesInput | ThirdModelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ThirdModel"> | string
    name?: StringWithAggregatesFilter<"ThirdModel"> | string
    description?: StringNullableWithAggregatesFilter<"ThirdModel"> | string | null
    fileKey?: StringWithAggregatesFilter<"ThirdModel"> | string
    bucketName?: StringWithAggregatesFilter<"ThirdModel"> | string
    fileSize?: IntWithAggregatesFilter<"ThirdModel"> | number
    fileType?: StringWithAggregatesFilter<"ThirdModel"> | string
    uploadDate?: DateTimeWithAggregatesFilter<"ThirdModel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ThirdModel"> | Date | string
    tags?: StringNullableListFilter<"ThirdModel">
    ownerId?: StringWithAggregatesFilter<"ThirdModel"> | string
    publicAccess?: BoolWithAggregatesFilter<"ThirdModel"> | boolean
    thumbnailUrl?: StringNullableWithAggregatesFilter<"ThirdModel"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"ThirdModel">
  }

  export type ThirdModelCreateInput = {
    id?: string
    name: string
    description?: string | null
    fileKey: string
    bucketName: string
    fileSize: number
    fileType: string
    uploadDate?: Date | string
    updatedAt?: Date | string
    tags?: ThirdModelCreatetagsInput | string[]
    ownerId: string
    publicAccess?: boolean
    thumbnailUrl?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ThirdModelUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    fileKey: string
    bucketName: string
    fileSize: number
    fileType: string
    uploadDate?: Date | string
    updatedAt?: Date | string
    tags?: ThirdModelCreatetagsInput | string[]
    ownerId: string
    publicAccess?: boolean
    thumbnailUrl?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ThirdModelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileKey?: StringFieldUpdateOperationsInput | string
    bucketName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ThirdModelUpdatetagsInput | string[]
    ownerId?: StringFieldUpdateOperationsInput | string
    publicAccess?: BoolFieldUpdateOperationsInput | boolean
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ThirdModelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileKey?: StringFieldUpdateOperationsInput | string
    bucketName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ThirdModelUpdatetagsInput | string[]
    ownerId?: StringFieldUpdateOperationsInput | string
    publicAccess?: BoolFieldUpdateOperationsInput | boolean
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ThirdModelCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    fileKey: string
    bucketName: string
    fileSize: number
    fileType: string
    uploadDate?: Date | string
    updatedAt?: Date | string
    tags?: ThirdModelCreatetagsInput | string[]
    ownerId: string
    publicAccess?: boolean
    thumbnailUrl?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ThirdModelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileKey?: StringFieldUpdateOperationsInput | string
    bucketName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ThirdModelUpdatetagsInput | string[]
    ownerId?: StringFieldUpdateOperationsInput | string
    publicAccess?: BoolFieldUpdateOperationsInput | boolean
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ThirdModelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileKey?: StringFieldUpdateOperationsInput | string
    bucketName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ThirdModelUpdatetagsInput | string[]
    ownerId?: StringFieldUpdateOperationsInput | string
    publicAccess?: BoolFieldUpdateOperationsInput | boolean
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ThirdModelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    fileKey?: SortOrder
    bucketName?: SortOrder
    fileSize?: SortOrder
    fileType?: SortOrder
    uploadDate?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
    ownerId?: SortOrder
    publicAccess?: SortOrder
    thumbnailUrl?: SortOrder
    metadata?: SortOrder
  }

  export type ThirdModelAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type ThirdModelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    fileKey?: SortOrder
    bucketName?: SortOrder
    fileSize?: SortOrder
    fileType?: SortOrder
    uploadDate?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    publicAccess?: SortOrder
    thumbnailUrl?: SortOrder
  }

  export type ThirdModelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    fileKey?: SortOrder
    bucketName?: SortOrder
    fileSize?: SortOrder
    fileType?: SortOrder
    uploadDate?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    publicAccess?: SortOrder
    thumbnailUrl?: SortOrder
  }

  export type ThirdModelSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ThirdModelCreatetagsInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ThirdModelUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
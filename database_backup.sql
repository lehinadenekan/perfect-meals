PGDMP  -    
                }           postgres    15.8    16.8 (Homebrew) \              0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            	           1262    29009    postgres    DATABASE     t   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE postgres;
                postgres    false            
           0    0    DATABASE postgres    ACL     2   GRANT ALL ON DATABASE postgres TO dashboard_user;
                   postgres    false    4361                        2615    29010    auth    SCHEMA        CREATE SCHEMA auth;
    DROP SCHEMA auth;
                supabase_admin    false                       0    0    SCHEMA auth    ACL        GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT ALL ON SCHEMA auth TO postgres;
                   supabase_admin    false    12                        2615    29011 
   extensions    SCHEMA        CREATE SCHEMA extensions;
    DROP SCHEMA extensions;
                postgres    false                       0    0    SCHEMA extensions    ACL     �   GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;
                   postgres    false    23                        2615    29012    graphql    SCHEMA        CREATE SCHEMA graphql;
    DROP SCHEMA graphql;
                supabase_admin    false                        2615    29013    graphql_public    SCHEMA        CREATE SCHEMA graphql_public;
    DROP SCHEMA graphql_public;
                supabase_admin    false                        2615    29014 	   pgbouncer    SCHEMA        CREATE SCHEMA pgbouncer;
    DROP SCHEMA pgbouncer;
             	   pgbouncer    false                        2615    29015    pgsodium    SCHEMA        CREATE SCHEMA pgsodium;
    DROP SCHEMA pgsodium;
                supabase_admin    false                        3079    29016    pgsodium 	   EXTENSION     >   CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;
    DROP EXTENSION pgsodium;
                   false    15                       0    0    EXTENSION pgsodium    COMMENT     \   COMMENT ON EXTENSION pgsodium IS 'Pgsodium is a modern cryptography library for Postgres.';
                        false    2                       0    0    SCHEMA public    ACL     �   GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
                   pg_database_owner    false    22                        2615    29317    realtime    SCHEMA        CREATE SCHEMA realtime;
    DROP SCHEMA realtime;
                supabase_admin    false                       0    0    SCHEMA realtime    ACL     �   GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;
                   supabase_admin    false    14                        2615    29318    storage    SCHEMA        CREATE SCHEMA storage;
    DROP SCHEMA storage;
                supabase_admin    false                       0    0    SCHEMA storage    ACL       GRANT ALL ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;
                   supabase_admin    false    24                        2615    29319    vault    SCHEMA        CREATE SCHEMA vault;
    DROP SCHEMA vault;
                supabase_admin    false                        3079    29968 
   pg_graphql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;
    DROP EXTENSION pg_graphql;
                   false    19                       0    0    EXTENSION pg_graphql    COMMENT     B   COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';
                        false    4                        3079    29330    pg_stat_statements 	   EXTENSION     J   CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;
 #   DROP EXTENSION pg_stat_statements;
                   false    23                       0    0    EXTENSION pg_stat_statements    COMMENT     u   COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';
                        false    8                        3079    29361    pgcrypto 	   EXTENSION     @   CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
    DROP EXTENSION pgcrypto;
                   false    23                       0    0    EXTENSION pgcrypto    COMMENT     <   COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
                        false    7                        3079    29398    pgjwt 	   EXTENSION     =   CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;
    DROP EXTENSION pgjwt;
                   false    23    7                       0    0    EXTENSION pgjwt    COMMENT     C   COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';
                        false    6                        3079    29405    supabase_vault 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;
    DROP EXTENSION supabase_vault;
                   false    17    2                       0    0    EXTENSION supabase_vault    COMMENT     C   COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';
                        false    3                        3079    29433 	   uuid-ossp 	   EXTENSION     C   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
    DROP EXTENSION "uuid-ossp";
                   false    23                       0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    5            �           1247    29445 	   aal_level    TYPE     K   CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);
    DROP TYPE auth.aal_level;
       auth          supabase_auth_admin    false    12            �           1247    29452    code_challenge_method    TYPE     L   CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);
 &   DROP TYPE auth.code_challenge_method;
       auth          supabase_auth_admin    false    12            �           1247    29458    factor_status    TYPE     M   CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);
    DROP TYPE auth.factor_status;
       auth          supabase_auth_admin    false    12            �           1247    29464    factor_type    TYPE     R   CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);
    DROP TYPE auth.factor_type;
       auth          supabase_auth_admin    false    12            �           1247    29472    one_time_token_type    TYPE     �   CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);
 $   DROP TYPE auth.one_time_token_type;
       auth          supabase_auth_admin    false    12            �           1247    29486    action    TYPE     o   CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);
    DROP TYPE realtime.action;
       realtime          supabase_admin    false    14            �           1247    29498    equality_op    TYPE     v   CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);
     DROP TYPE realtime.equality_op;
       realtime          supabase_admin    false    14            �           1247    29515    user_defined_filter    TYPE     j   CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);
 (   DROP TYPE realtime.user_defined_filter;
       realtime          supabase_admin    false    14    1233            �           1247    29518 
   wal_column    TYPE     �   CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);
    DROP TYPE realtime.wal_column;
       realtime          supabase_admin    false    14            �           1247    29521    wal_rls    TYPE     s   CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);
    DROP TYPE realtime.wal_rls;
       realtime          supabase_admin    false    14            y           1255    29522    email()    FUNCTION       CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;
    DROP FUNCTION auth.email();
       auth          supabase_auth_admin    false    12                       0    0    FUNCTION email()    COMMENT     X   COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';
          auth          supabase_auth_admin    false    377                       0    0    FUNCTION email()    ACL     f   GRANT ALL ON FUNCTION auth.email() TO dashboard_user;
GRANT ALL ON FUNCTION auth.email() TO postgres;
          auth          supabase_auth_admin    false    377            {           1255    29523    jwt()    FUNCTION     �   CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;
    DROP FUNCTION auth.jwt();
       auth          supabase_auth_admin    false    12                       0    0    FUNCTION jwt()    ACL     b   GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;
          auth          supabase_auth_admin    false    379            z           1255    29524    role()    FUNCTION        CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;
    DROP FUNCTION auth.role();
       auth          supabase_auth_admin    false    12                       0    0    FUNCTION role()    COMMENT     V   COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';
          auth          supabase_auth_admin    false    378                       0    0    FUNCTION role()    ACL     d   GRANT ALL ON FUNCTION auth.role() TO dashboard_user;
GRANT ALL ON FUNCTION auth.role() TO postgres;
          auth          supabase_auth_admin    false    378            x           1255    29525    uid()    FUNCTION     �   CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;
    DROP FUNCTION auth.uid();
       auth          supabase_auth_admin    false    12                       0    0    FUNCTION uid()    COMMENT     T   COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';
          auth          supabase_auth_admin    false    376                       0    0    FUNCTION uid()    ACL     b   GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;
GRANT ALL ON FUNCTION auth.uid() TO postgres;
          auth          supabase_auth_admin    false    376                       0    0 D   FUNCTION algorithm_sign(signables text, secret text, algorithm text)    ACL     �   GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO dashboard_user;
       
   extensions          supabase_admin    false    495                       0    0    FUNCTION armor(bytea)    ACL     �   GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;
       
   extensions          supabase_admin    false    463                        0    0 %   FUNCTION armor(bytea, text[], text[])    ACL     �   GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;
       
   extensions          supabase_admin    false    461            !           0    0    FUNCTION crypt(text, text)    ACL     �   GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;
       
   extensions          supabase_admin    false    497            "           0    0    FUNCTION dearmor(text)    ACL     �   GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;
       
   extensions          supabase_admin    false    462            #           0    0 $   FUNCTION decrypt(bytea, bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    494            $           0    0 .   FUNCTION decrypt_iv(bytea, bytea, bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    496            %           0    0    FUNCTION digest(bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    479            &           0    0    FUNCTION digest(text, text)    ACL     �   GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;
       
   extensions          supabase_admin    false    498            '           0    0 $   FUNCTION encrypt(bytea, bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    531            (           0    0 .   FUNCTION encrypt_iv(bytea, bytea, bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    532            )           0    0 "   FUNCTION gen_random_bytes(integer)    ACL     �   GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;
       
   extensions          supabase_admin    false    533            *           0    0    FUNCTION gen_random_uuid()    ACL     �   GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;
       
   extensions          supabase_admin    false    499            +           0    0    FUNCTION gen_salt(text)    ACL     �   GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;
       
   extensions          supabase_admin    false    539            ,           0    0     FUNCTION gen_salt(text, integer)    ACL     �   GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;
       
   extensions          supabase_admin    false    540            �           1255    29526    grant_pg_cron_access()    FUNCTION     �  CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;
 1   DROP FUNCTION extensions.grant_pg_cron_access();
    
   extensions          postgres    false    23            -           0    0    FUNCTION grant_pg_cron_access()    COMMENT     U   COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';
       
   extensions          postgres    false    506            .           0    0    FUNCTION grant_pg_cron_access()    ACL     �   REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;
       
   extensions          postgres    false    506                       1255    29527    grant_pg_graphql_access()    FUNCTION     i	  CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;
 4   DROP FUNCTION extensions.grant_pg_graphql_access();
    
   extensions          supabase_admin    false    23            /           0    0 "   FUNCTION grant_pg_graphql_access()    COMMENT     [   COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';
       
   extensions          supabase_admin    false    537            0           0    0 "   FUNCTION grant_pg_graphql_access()    ACL     Z   GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;
       
   extensions          supabase_admin    false    537            �           1255    29528    grant_pg_net_access()    FUNCTION     6  CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;
 0   DROP FUNCTION extensions.grant_pg_net_access();
    
   extensions          postgres    false    23            1           0    0    FUNCTION grant_pg_net_access()    COMMENT     S   COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';
       
   extensions          postgres    false    508            2           0    0    FUNCTION grant_pg_net_access()    ACL     �   REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;
       
   extensions          postgres    false    508            3           0    0 !   FUNCTION hmac(bytea, bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    541            4           0    0    FUNCTION hmac(text, text, text)    ACL     �   GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;
       
   extensions          supabase_admin    false    511            5           0    0 U  FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision)    ACL       GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO dashboard_user;
       
   extensions          supabase_admin    false    512            6           0    0 ^   FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone)    ACL        GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;
       
   extensions          supabase_admin    false    475            7           0    0 G   FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint)    ACL     �   GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO dashboard_user;
       
   extensions          supabase_admin    false    470            8           0    0 >   FUNCTION pgp_armor_headers(text, OUT key text, OUT value text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;
       
   extensions          supabase_admin    false    513            9           0    0    FUNCTION pgp_key_id(bytea)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;
       
   extensions          supabase_admin    false    514            :           0    0 &   FUNCTION pgp_pub_decrypt(bytea, bytea)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;
       
   extensions          supabase_admin    false    542            ;           0    0 ,   FUNCTION pgp_pub_decrypt(bytea, bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    473            <           0    0 2   FUNCTION pgp_pub_decrypt(bytea, bytea, text, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;
       
   extensions          supabase_admin    false    471            =           0    0 ,   FUNCTION pgp_pub_decrypt_bytea(bytea, bytea)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;
       
   extensions          supabase_admin    false    477            >           0    0 2   FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    472            ?           0    0 8   FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;
       
   extensions          supabase_admin    false    516            @           0    0 %   FUNCTION pgp_pub_encrypt(text, bytea)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;
       
   extensions          supabase_admin    false    478            A           0    0 +   FUNCTION pgp_pub_encrypt(text, bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    474            B           0    0 ,   FUNCTION pgp_pub_encrypt_bytea(bytea, bytea)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;
       
   extensions          supabase_admin    false    502            C           0    0 2   FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    476            D           0    0 %   FUNCTION pgp_sym_decrypt(bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    503            E           0    0 +   FUNCTION pgp_sym_decrypt(bytea, text, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;
       
   extensions          supabase_admin    false    504            F           0    0 +   FUNCTION pgp_sym_decrypt_bytea(bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    505            G           0    0 1   FUNCTION pgp_sym_decrypt_bytea(bytea, text, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;
       
   extensions          supabase_admin    false    507            H           0    0 $   FUNCTION pgp_sym_encrypt(text, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;
       
   extensions          supabase_admin    false    509            I           0    0 *   FUNCTION pgp_sym_encrypt(text, text, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;
       
   extensions          supabase_admin    false    510            J           0    0 +   FUNCTION pgp_sym_encrypt_bytea(bytea, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;
       
   extensions          supabase_admin    false    485            K           0    0 1   FUNCTION pgp_sym_encrypt_bytea(bytea, text, text)    ACL     �   GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;
       
   extensions          supabase_admin    false    486            |           1255    29529    pgrst_ddl_watch()    FUNCTION     >  CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;
 ,   DROP FUNCTION extensions.pgrst_ddl_watch();
    
   extensions          supabase_admin    false    23            L           0    0    FUNCTION pgrst_ddl_watch()    ACL     R   GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;
       
   extensions          supabase_admin    false    380            }           1255    29530    pgrst_drop_watch()    FUNCTION       CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;
 -   DROP FUNCTION extensions.pgrst_drop_watch();
    
   extensions          supabase_admin    false    23            M           0    0    FUNCTION pgrst_drop_watch()    ACL     S   GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;
       
   extensions          supabase_admin    false    381                       1255    29531    set_graphql_placeholder()    FUNCTION     r  CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;
 4   DROP FUNCTION extensions.set_graphql_placeholder();
    
   extensions          supabase_admin    false    23            N           0    0 "   FUNCTION set_graphql_placeholder()    COMMENT     |   COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';
       
   extensions          supabase_admin    false    543            O           0    0 "   FUNCTION set_graphql_placeholder()    ACL     Z   GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;
       
   extensions          supabase_admin    false    543            P           0    0 8   FUNCTION sign(payload json, secret text, algorithm text)    ACL     �   GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO dashboard_user;
       
   extensions          supabase_admin    false    517            Q           0    0 "   FUNCTION try_cast_double(inp text)    ACL     �   GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO dashboard_user;
       
   extensions          supabase_admin    false    518            R           0    0    FUNCTION url_decode(data text)    ACL     �   GRANT ALL ON FUNCTION extensions.url_decode(data text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO dashboard_user;
       
   extensions          supabase_admin    false    464            S           0    0    FUNCTION url_encode(data bytea)    ACL     �   GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO dashboard_user;
       
   extensions          supabase_admin    false    465            T           0    0    FUNCTION uuid_generate_v1()    ACL     �   GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;
       
   extensions          supabase_admin    false    519            U           0    0    FUNCTION uuid_generate_v1mc()    ACL     �   GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;
       
   extensions          supabase_admin    false    359            V           0    0 4   FUNCTION uuid_generate_v3(namespace uuid, name text)    ACL     �   GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;
       
   extensions          supabase_admin    false    520            W           0    0    FUNCTION uuid_generate_v4()    ACL     �   GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;
       
   extensions          supabase_admin    false    360            X           0    0 4   FUNCTION uuid_generate_v5(namespace uuid, name text)    ACL     �   GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;
       
   extensions          supabase_admin    false    361            Y           0    0    FUNCTION uuid_nil()    ACL     �   GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;
       
   extensions          supabase_admin    false    362            Z           0    0    FUNCTION uuid_ns_dns()    ACL     �   GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;
       
   extensions          supabase_admin    false    363            [           0    0    FUNCTION uuid_ns_oid()    ACL     �   GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;
       
   extensions          supabase_admin    false    364            \           0    0    FUNCTION uuid_ns_url()    ACL     �   GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;
       
   extensions          supabase_admin    false    521            ]           0    0    FUNCTION uuid_ns_x500()    ACL     �   GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;
       
   extensions          supabase_admin    false    530            ^           0    0 8   FUNCTION verify(token text, secret text, algorithm text)    ACL     �   GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO dashboard_user;
       
   extensions          supabase_admin    false    538            _           0    0 U   FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb)    ACL       GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;
          graphql_public          supabase_admin    false    545            �           1255    29532    get_auth(text)    FUNCTION     J  CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RAISE WARNING 'PgBouncer auth request: %', p_usename;

    RETURN QUERY
    SELECT usename::TEXT, passwd::TEXT FROM pg_catalog.pg_shadow
    WHERE usename = p_usename;
END;
$$;
 2   DROP FUNCTION pgbouncer.get_auth(p_usename text);
    	   pgbouncer          supabase_admin    false    13            `           0    0 !   FUNCTION get_auth(p_usename text)    ACL     �   REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;
       	   pgbouncer          supabase_admin    false    481            a           0    0 ]   FUNCTION crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea)    ACL     �   GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;
          pgsodium          pgsodium_keymaker    false    500            b           0    0 ]   FUNCTION crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea)    ACL     �   GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;
          pgsodium          pgsodium_keymaker    false    501            c           0    0 !   FUNCTION crypto_aead_det_keygen()    ACL     I   GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_keygen() TO service_role;
          pgsodium          supabase_admin    false    469                       1255    29533    apply_rls(jsonb, integer)    FUNCTION     �(  CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;
 G   DROP FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer);
       realtime          supabase_admin    false    14    1242            d           0    0 7   FUNCTION apply_rls(wal jsonb, max_record_bytes integer)    ACL     <  GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;
          realtime          supabase_admin    false    515                       1255    29535 E   broadcast_changes(text, text, text, text, text, record, record, text)    FUNCTION       CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;
 �   DROP FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text);
       realtime          supabase_admin    false    14            e           0    0 �   FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text)    ACL     v  GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;
          realtime          supabase_admin    false    523                       1255    29536 C   build_prepared_statement_sql(text, regclass, realtime.wal_column[])    FUNCTION     �  CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;
 �   DROP FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]);
       realtime          supabase_admin    false    14    1239            f           0    0 s   FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[])    ACL     �  GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;
          realtime          supabase_admin    false    534            �           1255    29537    cast(text, regtype)    FUNCTION       CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;
 8   DROP FUNCTION realtime."cast"(val text, type_ regtype);
       realtime          supabase_admin    false    14            g           0    0 (   FUNCTION "cast"(val text, type_ regtype)    ACL     �  GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;
          realtime          supabase_admin    false    480                       1255    29538 <   check_equality_op(realtime.equality_op, regtype, text, text)    FUNCTION     U  CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;
 j   DROP FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text);
       realtime          supabase_admin    false    14    1233            h           0    0 Z   FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text)    ACL       GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;
          realtime          supabase_admin    false    524                       1255    29539 Q   is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[])    FUNCTION     �  CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;
 z   DROP FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]);
       realtime          supabase_admin    false    1236    1239    14            i           0    0 j   FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[])    ACL     n  GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;
          realtime          supabase_admin    false    535                       1255    29540 *   list_changes(name, name, integer, integer)    FUNCTION     �  CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;
 v   DROP FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer);
       realtime          supabase_admin    false    14    1242            j           0    0 f   FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer)    ACL     V  GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;
          realtime          supabase_admin    false    525                       1255    29541    quote_wal2json(regclass)    FUNCTION     �  CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;
 8   DROP FUNCTION realtime.quote_wal2json(entity regclass);
       realtime          supabase_admin    false    14            k           0    0 (   FUNCTION quote_wal2json(entity regclass)    ACL     �  GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;
          realtime          supabase_admin    false    526            �           1255    29542     send(jsonb, text, text, boolean)    FUNCTION       CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      PERFORM pg_notify(
          'realtime:system',
          jsonb_build_object(
              'error', SQLERRM,
              'function', 'realtime.send',
              'event', event,
              'topic', topic,
              'private', private
          )::text
      );
  END;
END;
$$;
 U   DROP FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean);
       realtime          supabase_admin    false    14            l           0    0 E   FUNCTION send(payload jsonb, event text, topic text, private boolean)    ACL     �   GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;
          realtime          supabase_admin    false    489                       1255    29543    subscription_check_filters()    FUNCTION     <
  CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;
 5   DROP FUNCTION realtime.subscription_check_filters();
       realtime          supabase_admin    false    14            m           0    0 %   FUNCTION subscription_check_filters()    ACL     �  GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;
          realtime          supabase_admin    false    536            �           1255    29544    to_regrole(text)    FUNCTION     �   CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;
 3   DROP FUNCTION realtime.to_regrole(role_name text);
       realtime          supabase_admin    false    14            n           0    0 #   FUNCTION to_regrole(role_name text)    ACL     �  GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;
          realtime          supabase_admin    false    483            �           1255    29545    topic()    FUNCTION     �   CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;
     DROP FUNCTION realtime.topic();
       realtime          supabase_realtime_admin    false    14            o           0    0    FUNCTION topic()    ACL     n   GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;
          realtime          supabase_realtime_admin    false    484            �           1255    29546 *   can_insert_object(text, text, uuid, jsonb)    FUNCTION     �  CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;
 _   DROP FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb);
       storage          supabase_storage_admin    false    24            p           0    0 P   FUNCTION can_insert_object(bucketid text, name text, owner uuid, metadata jsonb)    ACL     s   GRANT ALL ON FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) TO postgres;
          storage          supabase_storage_admin    false    490            �           1255    29547    extension(text)    FUNCTION     Z  CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;
 ,   DROP FUNCTION storage.extension(name text);
       storage          supabase_storage_admin    false    24            q           0    0    FUNCTION extension(name text)    ACL     @   GRANT ALL ON FUNCTION storage.extension(name text) TO postgres;
          storage          supabase_storage_admin    false    491            �           1255    29548    filename(text)    FUNCTION     �   CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;
 +   DROP FUNCTION storage.filename(name text);
       storage          supabase_storage_admin    false    24            r           0    0    FUNCTION filename(name text)    ACL     ?   GRANT ALL ON FUNCTION storage.filename(name text) TO postgres;
          storage          supabase_storage_admin    false    482            �           1255    29549    foldername(text)    FUNCTION     �   CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;
 -   DROP FUNCTION storage.foldername(name text);
       storage          supabase_storage_admin    false    24            s           0    0    FUNCTION foldername(name text)    ACL     A   GRANT ALL ON FUNCTION storage.foldername(name text) TO postgres;
          storage          supabase_storage_admin    false    487            �           1255    29550    get_size_by_bucket()    FUNCTION        CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;
 ,   DROP FUNCTION storage.get_size_by_bucket();
       storage          supabase_storage_admin    false    24            t           0    0    FUNCTION get_size_by_bucket()    ACL     @   GRANT ALL ON FUNCTION storage.get_size_by_bucket() TO postgres;
          storage          supabase_storage_admin    false    488                       1255    29551 L   list_multipart_uploads_with_delimiter(text, text, text, integer, text, text)    FUNCTION     9  CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;
 �   DROP FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text);
       storage          supabase_storage_admin    false    24            u           0    0 �   FUNCTION list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text)    ACL     �   GRANT ALL ON FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) TO postgres;
          storage          supabase_storage_admin    false    527                       1255    29552 B   list_objects_with_delimiter(text, text, text, integer, text, text)    FUNCTION     �  CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;
 �   DROP FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text);
       storage          supabase_storage_admin    false    24            v           0    0 �   FUNCTION list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text)    ACL     �   GRANT ALL ON FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) TO postgres;
          storage          supabase_storage_admin    false    528            �           1255    29553    operation()    FUNCTION     �   CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;
 #   DROP FUNCTION storage.operation();
       storage          supabase_storage_admin    false    24            w           0    0    FUNCTION operation()    ACL     7   GRANT ALL ON FUNCTION storage.operation() TO postgres;
          storage          supabase_storage_admin    false    492                       1255    29554 ?   search(text, text, integer, integer, integer, text, text, text)    FUNCTION       CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;
 �   DROP FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text);
       storage          supabase_storage_admin    false    24            x           0    0 �   FUNCTION search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text)    ACL     �   GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) TO postgres;
          storage          supabase_storage_admin    false    529            �           1255    29555    update_updated_at_column()    FUNCTION     �   CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;
 2   DROP FUNCTION storage.update_updated_at_column();
       storage          supabase_storage_admin    false    24            y           0    0 #   FUNCTION update_updated_at_column()    ACL     F   GRANT ALL ON FUNCTION storage.update_updated_at_column() TO postgres;
          storage          supabase_storage_admin    false    493            d           1255    29429    secrets_encrypt_secret_secret()    FUNCTION     (  CREATE FUNCTION vault.secrets_encrypt_secret_secret() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;
 5   DROP FUNCTION vault.secrets_encrypt_secret_secret();
       vault          supabase_admin    false    17            �            1259    29556    audit_log_entries    TABLE     �   CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);
 #   DROP TABLE auth.audit_log_entries;
       auth         heap    supabase_auth_admin    false    12            z           0    0    TABLE audit_log_entries    COMMENT     R   COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';
          auth          supabase_auth_admin    false    253            {           0    0    TABLE audit_log_entries    ACL     �   GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;
          auth          supabase_auth_admin    false    253            �            1259    29562 
   flow_state    TABLE     �  CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);
    DROP TABLE auth.flow_state;
       auth         heap    supabase_auth_admin    false    1218    12            |           0    0    TABLE flow_state    COMMENT     G   COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';
          auth          supabase_auth_admin    false    254            }           0    0    TABLE flow_state    ACL     �   GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;
          auth          supabase_auth_admin    false    254            �            1259    29567 
   identities    TABLE     �  CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);
    DROP TABLE auth.identities;
       auth         heap    supabase_auth_admin    false    12            ~           0    0    TABLE identities    COMMENT     U   COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';
          auth          supabase_auth_admin    false    255                       0    0    COLUMN identities.email    COMMENT     �   COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';
          auth          supabase_auth_admin    false    255            �           0    0    TABLE identities    ACL     �   GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;
          auth          supabase_auth_admin    false    255                        1259    29574 	   instances    TABLE     �   CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE auth.instances;
       auth         heap    supabase_auth_admin    false    12            �           0    0    TABLE instances    COMMENT     Q   COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';
          auth          supabase_auth_admin    false    256            �           0    0    TABLE instances    ACL     �   GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;
          auth          supabase_auth_admin    false    256                       1259    29579    mfa_amr_claims    TABLE     �   CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);
     DROP TABLE auth.mfa_amr_claims;
       auth         heap    supabase_auth_admin    false    12            �           0    0    TABLE mfa_amr_claims    COMMENT     ~   COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';
          auth          supabase_auth_admin    false    257            �           0    0    TABLE mfa_amr_claims    ACL     �   GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;
          auth          supabase_auth_admin    false    257                       1259    29584    mfa_challenges    TABLE       CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);
     DROP TABLE auth.mfa_challenges;
       auth         heap    supabase_auth_admin    false    12            �           0    0    TABLE mfa_challenges    COMMENT     _   COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';
          auth          supabase_auth_admin    false    258            �           0    0    TABLE mfa_challenges    ACL     �   GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;
          auth          supabase_auth_admin    false    258                       1259    29589    mfa_factors    TABLE     �  CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);
    DROP TABLE auth.mfa_factors;
       auth         heap    supabase_auth_admin    false    1224    1221    12            �           0    0    TABLE mfa_factors    COMMENT     L   COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';
          auth          supabase_auth_admin    false    259            �           0    0    TABLE mfa_factors    ACL     �   GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;
          auth          supabase_auth_admin    false    259                       1259    29594    one_time_tokens    TABLE     �  CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);
 !   DROP TABLE auth.one_time_tokens;
       auth         heap    supabase_auth_admin    false    12    1227            �           0    0    TABLE one_time_tokens    ACL     �   GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;
          auth          supabase_auth_admin    false    260                       1259    29602    refresh_tokens    TABLE     8  CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);
     DROP TABLE auth.refresh_tokens;
       auth         heap    supabase_auth_admin    false    12            �           0    0    TABLE refresh_tokens    COMMENT     n   COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';
          auth          supabase_auth_admin    false    261            �           0    0    TABLE refresh_tokens    ACL     �   GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;
          auth          supabase_auth_admin    false    261                       1259    29607    refresh_tokens_id_seq    SEQUENCE     |   CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE auth.refresh_tokens_id_seq;
       auth          supabase_auth_admin    false    261    12            �           0    0    refresh_tokens_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;
          auth          supabase_auth_admin    false    262            �           0    0    SEQUENCE refresh_tokens_id_seq    ACL     �   GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;
          auth          supabase_auth_admin    false    262                       1259    29608    saml_providers    TABLE     H  CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);
     DROP TABLE auth.saml_providers;
       auth         heap    supabase_auth_admin    false    12            �           0    0    TABLE saml_providers    COMMENT     ]   COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';
          auth          supabase_auth_admin    false    263            �           0    0    TABLE saml_providers    ACL     �   GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;
          auth          supabase_auth_admin    false    263                       1259    29616    saml_relay_states    TABLE     `  CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);
 #   DROP TABLE auth.saml_relay_states;
       auth         heap    supabase_auth_admin    false    12            �           0    0    TABLE saml_relay_states    COMMENT     �   COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';
          auth          supabase_auth_admin    false    264            �           0    0    TABLE saml_relay_states    ACL     �   GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;
          auth          supabase_auth_admin    false    264            	           1259    29622    schema_migrations    TABLE     U   CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);
 #   DROP TABLE auth.schema_migrations;
       auth         heap    supabase_auth_admin    false    12            �           0    0    TABLE schema_migrations    COMMENT     X   COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';
          auth          supabase_auth_admin    false    265            �           0    0    TABLE schema_migrations    ACL     �   GRANT ALL ON TABLE auth.schema_migrations TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.schema_migrations TO postgres;
GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;
          auth          supabase_auth_admin    false    265            
           1259    29625    sessions    TABLE     T  CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);
    DROP TABLE auth.sessions;
       auth         heap    supabase_auth_admin    false    12    1215            �           0    0    TABLE sessions    COMMENT     U   COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';
          auth          supabase_auth_admin    false    266            �           0    0    COLUMN sessions.not_after    COMMENT     �   COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';
          auth          supabase_auth_admin    false    266            �           0    0    TABLE sessions    ACL     �   GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;
          auth          supabase_auth_admin    false    266                       1259    29630    sso_domains    TABLE       CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);
    DROP TABLE auth.sso_domains;
       auth         heap    supabase_auth_admin    false    12            �           0    0    TABLE sso_domains    COMMENT     t   COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';
          auth          supabase_auth_admin    false    267            �           0    0    TABLE sso_domains    ACL     �   GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;
          auth          supabase_auth_admin    false    267                       1259    29636    sso_providers    TABLE       CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);
    DROP TABLE auth.sso_providers;
       auth         heap    supabase_auth_admin    false    12            �           0    0    TABLE sso_providers    COMMENT     x   COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';
          auth          supabase_auth_admin    false    268            �           0    0     COLUMN sso_providers.resource_id    COMMENT     �   COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';
          auth          supabase_auth_admin    false    268            �           0    0    TABLE sso_providers    ACL     �   GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;
          auth          supabase_auth_admin    false    268                       1259    29642    users    TABLE     4  CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);
    DROP TABLE auth.users;
       auth         heap    supabase_auth_admin    false    12            �           0    0    TABLE users    COMMENT     W   COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';
          auth          supabase_auth_admin    false    269            �           0    0    COLUMN users.is_sso_user    COMMENT     �   COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';
          auth          supabase_auth_admin    false    269            �           0    0    TABLE users    ACL     �   GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;
          auth          supabase_auth_admin    false    269            �           0    0    TABLE pg_stat_statements    ACL     �   GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;
       
   extensions          supabase_admin    false    247            �           0    0    TABLE pg_stat_statements_info    ACL     �   GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;
       
   extensions          supabase_admin    false    246            �           0    0    TABLE decrypted_key    ACL     A   GRANT ALL ON TABLE pgsodium.decrypted_key TO pgsodium_keyholder;
          pgsodium          supabase_admin    false    245            �           0    0    TABLE masking_rule    ACL     @   GRANT ALL ON TABLE pgsodium.masking_rule TO pgsodium_keyholder;
          pgsodium          supabase_admin    false    243            �           0    0    TABLE mask_columns    ACL     @   GRANT ALL ON TABLE pgsodium.mask_columns TO pgsodium_keyholder;
          pgsodium          supabase_admin    false    244                       1259    29985    Account    TABLE     F  CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);
    DROP TABLE public."Account";
       public         heap    postgres    false            �           0    0    TABLE "Account"    ACL     �   GRANT ALL ON TABLE public."Account" TO anon;
GRANT ALL ON TABLE public."Account" TO authenticated;
GRANT ALL ON TABLE public."Account" TO service_role;
          public          postgres    false    280            *           1259    30137    Album    TABLE     R  CREATE TABLE public."Album" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    "coverImage" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL,
    "isPublic" boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Album";
       public         heap    postgres    false            �           0    0    TABLE "Album"    ACL     �   GRANT ALL ON TABLE public."Album" TO anon;
GRANT ALL ON TABLE public."Album" TO authenticated;
GRANT ALL ON TABLE public."Album" TO service_role;
          public          postgres    false    298                       1259    30045    Category    TABLE     Q   CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL
);
    DROP TABLE public."Category";
       public         heap    postgres    false            �           0    0    TABLE "Category"    ACL     �   GRANT ALL ON TABLE public."Category" TO anon;
GRANT ALL ON TABLE public."Category" TO authenticated;
GRANT ALL ON TABLE public."Category" TO service_role;
          public          postgres    false    287            #           1259    30075    Cuisine    TABLE     W  CREATE TABLE public."Cuisine" (
    id text NOT NULL,
    name text NOT NULL,
    region text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "imageUrl" text,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "averagePreparationTime" integer NOT NULL,
    "commonIngredients" text[],
    "cookingMethods" text[],
    "culturalContext" text,
    description text,
    "dietaryConsiderations" text[],
    "difficultyLevel" text NOT NULL,
    "mealTypes" text[],
    "parentCuisineId" text,
    "spiceProfile" text[],
    "subRegion" text
);
    DROP TABLE public."Cuisine";
       public         heap    postgres    false            �           0    0    TABLE "Cuisine"    ACL     �   GRANT ALL ON TABLE public."Cuisine" TO anon;
GRANT ALL ON TABLE public."Cuisine" TO authenticated;
GRANT ALL ON TABLE public."Cuisine" TO service_role;
          public          postgres    false    291            )           1259    30129    DietaryFeedback    TABLE     �  CREATE TABLE public."DietaryFeedback" (
    id text NOT NULL,
    "recipeId" text NOT NULL,
    "lowFodmapIncorrect" boolean NOT NULL,
    "fermentedIncorrect" boolean NOT NULL,
    "pescatarianIncorrect" boolean NOT NULL,
    comment text,
    "currentAnalysis" jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 %   DROP TABLE public."DietaryFeedback";
       public         heap    postgres    false            �           0    0    TABLE "DietaryFeedback"    ACL     �   GRANT ALL ON TABLE public."DietaryFeedback" TO anon;
GRANT ALL ON TABLE public."DietaryFeedback" TO authenticated;
GRANT ALL ON TABLE public."DietaryFeedback" TO service_role;
          public          postgres    false    297                       1259    30023 
   Ingredient    TABLE     �   CREATE TABLE public."Ingredient" (
    id text NOT NULL,
    name text NOT NULL,
    amount double precision NOT NULL,
    unit text NOT NULL,
    notes text,
    "recipeId" text NOT NULL,
    "isFermented" boolean DEFAULT false NOT NULL
);
     DROP TABLE public."Ingredient";
       public         heap    postgres    false            �           0    0    TABLE "Ingredient"    ACL     �   GRANT ALL ON TABLE public."Ingredient" TO anon;
GRANT ALL ON TABLE public."Ingredient" TO authenticated;
GRANT ALL ON TABLE public."Ingredient" TO service_role;
          public          postgres    false    284                       1259    30031    Instruction    TABLE     �   CREATE TABLE public."Instruction" (
    id text NOT NULL,
    "stepNumber" integer NOT NULL,
    description text NOT NULL,
    "recipeId" text NOT NULL
);
 !   DROP TABLE public."Instruction";
       public         heap    postgres    false            �           0    0    TABLE "Instruction"    ACL     �   GRANT ALL ON TABLE public."Instruction" TO anon;
GRANT ALL ON TABLE public."Instruction" TO authenticated;
GRANT ALL ON TABLE public."Instruction" TO service_role;
          public          postgres    false    285                       1259    30038    NutritionFacts    TABLE       CREATE TABLE public."NutritionFacts" (
    id text NOT NULL,
    protein double precision,
    carbs double precision,
    fat double precision,
    fiber double precision,
    sugar double precision,
    sodium double precision,
    "recipeId" text NOT NULL
);
 $   DROP TABLE public."NutritionFacts";
       public         heap    postgres    false            �           0    0    TABLE "NutritionFacts"    ACL     �   GRANT ALL ON TABLE public."NutritionFacts" TO anon;
GRANT ALL ON TABLE public."NutritionFacts" TO authenticated;
GRANT ALL ON TABLE public."NutritionFacts" TO service_role;
          public          postgres    false    286                       1259    30006    Recipe    TABLE     M  CREATE TABLE public."Recipe" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title text NOT NULL,
    description text,
    "cookingTime" integer,
    servings integer,
    difficulty text,
    "cuisineType" text,
    "authorId" text NOT NULL,
    "isVegetarian" boolean DEFAULT false,
    "isVegan" boolean DEFAULT false,
    "isGlutenFree" boolean DEFAULT false,
    "isNutFree" boolean DEFAULT false,
    "jobId" text,
    "isFermented" boolean DEFAULT false,
    "isLactoseFree" boolean DEFAULT false,
    "isLowFodmap" boolean DEFAULT false,
    "isPescatarian" boolean DEFAULT false,
    "needsDietaryReview" boolean DEFAULT false NOT NULL,
    "imageUrl" text,
    "regionOfOrigin" text,
    search_vector tsvector
);
    DROP TABLE public."Recipe";
       public         heap    postgres    false            �           0    0    TABLE "Recipe"    ACL     �   GRANT ALL ON TABLE public."Recipe" TO anon;
GRANT ALL ON TABLE public."Recipe" TO authenticated;
GRANT ALL ON TABLE public."Recipe" TO service_role;
          public          postgres    false    283            '           1259    30111    RecipeGenerationJob    TABLE     p  CREATE TABLE public."RecipeGenerationJob" (
    id text NOT NULL,
    status text NOT NULL,
    "totalRecipes" integer NOT NULL,
    completed integer DEFAULT 0 NOT NULL,
    failed integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    error text
);
 )   DROP TABLE public."RecipeGenerationJob";
       public         heap    postgres    false            �           0    0    TABLE "RecipeGenerationJob"    ACL     �   GRANT ALL ON TABLE public."RecipeGenerationJob" TO anon;
GRANT ALL ON TABLE public."RecipeGenerationJob" TO authenticated;
GRANT ALL ON TABLE public."RecipeGenerationJob" TO service_role;
          public          postgres    false    295            +           1259    30146    RecipeToAlbum    TABLE     �   CREATE TABLE public."RecipeToAlbum" (
    id text NOT NULL,
    "albumId" text NOT NULL,
    "recipeId" text NOT NULL,
    "addedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 #   DROP TABLE public."RecipeToAlbum";
       public         heap    postgres    false            �           0    0    TABLE "RecipeToAlbum"    ACL     �   GRANT ALL ON TABLE public."RecipeToAlbum" TO anon;
GRANT ALL ON TABLE public."RecipeToAlbum" TO authenticated;
GRANT ALL ON TABLE public."RecipeToAlbum" TO service_role;
          public          postgres    false    299            !           1259    30059    Review    TABLE     �   CREATE TABLE public."Review" (
    id text NOT NULL,
    rating integer NOT NULL,
    comment text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "recipeId" text NOT NULL
);
    DROP TABLE public."Review";
       public         heap    postgres    false            �           0    0    TABLE "Review"    ACL     �   GRANT ALL ON TABLE public."Review" TO anon;
GRANT ALL ON TABLE public."Review" TO authenticated;
GRANT ALL ON TABLE public."Review" TO service_role;
          public          postgres    false    289                       1259    29992    Session    TABLE     �   CREATE TABLE public."Session" (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Session";
       public         heap    postgres    false            �           0    0    TABLE "Session"    ACL     �   GRANT ALL ON TABLE public."Session" TO anon;
GRANT ALL ON TABLE public."Session" TO authenticated;
GRANT ALL ON TABLE public."Session" TO service_role;
          public          postgres    false    281            "           1259    30067    StandardIngredient    TABLE       CREATE TABLE public."StandardIngredient" (
    id text NOT NULL,
    name text NOT NULL,
    category text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 (   DROP TABLE public."StandardIngredient";
       public         heap    postgres    false            �           0    0    TABLE "StandardIngredient"    ACL     �   GRANT ALL ON TABLE public."StandardIngredient" TO anon;
GRANT ALL ON TABLE public."StandardIngredient" TO authenticated;
GRANT ALL ON TABLE public."StandardIngredient" TO service_role;
          public          postgres    false    290                        1259    30052    Tag    TABLE     L   CREATE TABLE public."Tag" (
    id text NOT NULL,
    name text NOT NULL
);
    DROP TABLE public."Tag";
       public         heap    postgres    false            �           0    0    TABLE "Tag"    ACL     �   GRANT ALL ON TABLE public."Tag" TO anon;
GRANT ALL ON TABLE public."Tag" TO authenticated;
GRANT ALL ON TABLE public."Tag" TO service_role;
          public          postgres    false    288            %           1259    30095    UserAllergy    TABLE     %  CREATE TABLE public."UserAllergy" (
    id text NOT NULL,
    "ingredientId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    severity text NOT NULL,
    "userEmail" text NOT NULL
);
 !   DROP TABLE public."UserAllergy";
       public         heap    postgres    false            �           0    0    TABLE "UserAllergy"    ACL     �   GRANT ALL ON TABLE public."UserAllergy" TO anon;
GRANT ALL ON TABLE public."UserAllergy" TO authenticated;
GRANT ALL ON TABLE public."UserAllergy" TO service_role;
          public          postgres    false    293            &           1259    30103    UserCuisinePreference    TABLE     5  CREATE TABLE public."UserCuisinePreference" (
    id text NOT NULL,
    "cuisineId" text NOT NULL,
    "preferenceLevel" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userEmail" text NOT NULL
);
 +   DROP TABLE public."UserCuisinePreference";
       public         heap    postgres    false            �           0    0    TABLE "UserCuisinePreference"    ACL     �   GRANT ALL ON TABLE public."UserCuisinePreference" TO anon;
GRANT ALL ON TABLE public."UserCuisinePreference" TO authenticated;
GRANT ALL ON TABLE public."UserCuisinePreference" TO service_role;
          public          postgres    false    294            $           1259    30083    UserPreference    TABLE     W  CREATE TABLE public."UserPreference" (
    id text NOT NULL,
    "userEmail" text NOT NULL,
    "cookingTime" text DEFAULT 'MEDIUM'::text NOT NULL,
    "mealPrep" boolean DEFAULT false NOT NULL,
    "servingSize" integer DEFAULT 2 NOT NULL,
    "dietTypes" text[] DEFAULT ARRAY[]::text[],
    "excludedFoods" text[] DEFAULT ARRAY[]::text[]
);
 $   DROP TABLE public."UserPreference";
       public         heap    postgres    false            �           0    0    TABLE "UserPreference"    ACL     �   GRANT ALL ON TABLE public."UserPreference" TO anon;
GRANT ALL ON TABLE public."UserPreference" TO authenticated;
GRANT ALL ON TABLE public."UserPreference" TO service_role;
          public          postgres    false    292            (           1259    30121    UserRecipeHistory    TABLE     �   CREATE TABLE public."UserRecipeHistory" (
    id text NOT NULL,
    "userEmail" text NOT NULL,
    "recipeId" text NOT NULL,
    "shownAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 '   DROP TABLE public."UserRecipeHistory";
       public         heap    postgres    false            �           0    0    TABLE "UserRecipeHistory"    ACL     �   GRANT ALL ON TABLE public."UserRecipeHistory" TO anon;
GRANT ALL ON TABLE public."UserRecipeHistory" TO authenticated;
GRANT ALL ON TABLE public."UserRecipeHistory" TO service_role;
          public          postgres    false    296            .           1259    30168    _CategoryToRecipe    TABLE     Z   CREATE TABLE public."_CategoryToRecipe" (
    "A" text NOT NULL,
    "B" text NOT NULL
);
 '   DROP TABLE public."_CategoryToRecipe";
       public         heap    postgres    false            �           0    0    TABLE "_CategoryToRecipe"    ACL     �   GRANT ALL ON TABLE public."_CategoryToRecipe" TO anon;
GRANT ALL ON TABLE public."_CategoryToRecipe" TO authenticated;
GRANT ALL ON TABLE public."_CategoryToRecipe" TO service_role;
          public          postgres    false    302            /           1259    30175    _CuisineRecipes    TABLE     X   CREATE TABLE public."_CuisineRecipes" (
    "A" text NOT NULL,
    "B" text NOT NULL
);
 %   DROP TABLE public."_CuisineRecipes";
       public         heap    postgres    false            �           0    0    TABLE "_CuisineRecipes"    ACL     �   GRANT ALL ON TABLE public."_CuisineRecipes" TO anon;
GRANT ALL ON TABLE public."_CuisineRecipes" TO authenticated;
GRANT ALL ON TABLE public."_CuisineRecipes" TO service_role;
          public          postgres    false    303            0           1259    30182    _RecipeFusionCuisines    TABLE     ^   CREATE TABLE public."_RecipeFusionCuisines" (
    "A" text NOT NULL,
    "B" text NOT NULL
);
 +   DROP TABLE public."_RecipeFusionCuisines";
       public         heap    postgres    false            �           0    0    TABLE "_RecipeFusionCuisines"    ACL     �   GRANT ALL ON TABLE public."_RecipeFusionCuisines" TO anon;
GRANT ALL ON TABLE public."_RecipeFusionCuisines" TO authenticated;
GRANT ALL ON TABLE public."_RecipeFusionCuisines" TO service_role;
          public          postgres    false    304            ,           1259    30154    _RecipeToTag    TABLE     U   CREATE TABLE public."_RecipeToTag" (
    "A" text NOT NULL,
    "B" text NOT NULL
);
 "   DROP TABLE public."_RecipeToTag";
       public         heap    postgres    false            �           0    0    TABLE "_RecipeToTag"    ACL     �   GRANT ALL ON TABLE public."_RecipeToTag" TO anon;
GRANT ALL ON TABLE public."_RecipeToTag" TO authenticated;
GRANT ALL ON TABLE public."_RecipeToTag" TO service_role;
          public          postgres    false    300            -           1259    30161    _SavedRecipes    TABLE     V   CREATE TABLE public."_SavedRecipes" (
    "A" text NOT NULL,
    "B" text NOT NULL
);
 #   DROP TABLE public."_SavedRecipes";
       public         heap    postgres    false            �           0    0    TABLE "_SavedRecipes"    ACL     �   GRANT ALL ON TABLE public."_SavedRecipes" TO anon;
GRANT ALL ON TABLE public."_SavedRecipes" TO authenticated;
GRANT ALL ON TABLE public."_SavedRecipes" TO service_role;
          public          postgres    false    301            1           1259    31560    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            �           0    0    TABLE _prisma_migrations    ACL     �   GRANT ALL ON TABLE public._prisma_migrations TO anon;
GRANT ALL ON TABLE public._prisma_migrations TO authenticated;
GRANT ALL ON TABLE public._prisma_migrations TO service_role;
          public          postgres    false    305                       1259    29999    users    TABLE     �   CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    name text,
    image text,
    email_verified timestamp(3) without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            �           0    0    TABLE users    ACL     �   GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;
          public          postgres    false    282                       1259    29657    messages    TABLE     w  CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);
    DROP TABLE realtime.messages;
       realtime            supabase_realtime_admin    false    14            �           0    0    TABLE messages    ACL     8  GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;
          realtime          supabase_realtime_admin    false    270                       1259    29664    schema_migrations    TABLE     y   CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);
 '   DROP TABLE realtime.schema_migrations;
       realtime         heap    supabase_admin    false    14            �           0    0    TABLE schema_migrations    ACL     �  GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;
          realtime          supabase_admin    false    271                       1259    29667    subscription    TABLE     �  CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
 "   DROP TABLE realtime.subscription;
       realtime         heap    supabase_admin    false    1236    483    1236    14            �           0    0    TABLE subscription    ACL     g  GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;
          realtime          supabase_admin    false    272                       1259    29675    subscription_id_seq    SEQUENCE     �   ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            realtime          supabase_admin    false    272    14            �           0    0    SEQUENCE subscription_id_seq    ACL     �  GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;
          realtime          supabase_admin    false    273                       1259    29676    buckets    TABLE     k  CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);
    DROP TABLE storage.buckets;
       storage         heap    supabase_storage_admin    false    24            �           0    0    COLUMN buckets.owner    COMMENT     X   COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';
          storage          supabase_storage_admin    false    274            �           0    0    TABLE buckets    ACL     �   GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres;
          storage          supabase_storage_admin    false    274                       1259    29685 
   migrations    TABLE     �   CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE storage.migrations;
       storage         heap    supabase_storage_admin    false    24            �           0    0    TABLE migrations    ACL     �   GRANT ALL ON TABLE storage.migrations TO anon;
GRANT ALL ON TABLE storage.migrations TO authenticated;
GRANT ALL ON TABLE storage.migrations TO service_role;
GRANT ALL ON TABLE storage.migrations TO postgres;
          storage          supabase_storage_admin    false    275                       1259    29689    objects    TABLE     �  CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);
    DROP TABLE storage.objects;
       storage         heap    supabase_storage_admin    false    24            �           0    0    COLUMN objects.owner    COMMENT     X   COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';
          storage          supabase_storage_admin    false    276            �           0    0    TABLE objects    ACL     �   GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres;
          storage          supabase_storage_admin    false    276                       1259    29699    s3_multipart_uploads    TABLE     j  CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);
 )   DROP TABLE storage.s3_multipart_uploads;
       storage         heap    supabase_storage_admin    false    24            �           0    0    TABLE s3_multipart_uploads    ACL     �   GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;
GRANT ALL ON TABLE storage.s3_multipart_uploads TO postgres;
          storage          supabase_storage_admin    false    277                       1259    29706    s3_multipart_uploads_parts    TABLE     �  CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
 /   DROP TABLE storage.s3_multipart_uploads_parts;
       storage         heap    supabase_storage_admin    false    24            �           0    0     TABLE s3_multipart_uploads_parts    ACL       GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;
GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO postgres;
          storage          supabase_storage_admin    false    278            �            1259    29425    decrypted_secrets    VIEW     �  CREATE VIEW vault.decrypted_secrets AS
 SELECT secrets.id,
    secrets.name,
    secrets.description,
    secrets.secret,
        CASE
            WHEN (secrets.secret IS NULL) THEN NULL::text
            ELSE
            CASE
                WHEN (secrets.key_id IS NULL) THEN NULL::text
                ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(secrets.secret, 'base64'::text), convert_to(((((secrets.id)::text || secrets.description) || (secrets.created_at)::text) || (secrets.updated_at)::text), 'utf8'::name), secrets.key_id, secrets.nonce), 'utf8'::name)
            END
        END AS decrypted_secret,
    secrets.key_id,
    secrets.nonce,
    secrets.created_at,
    secrets.updated_at
   FROM vault.secrets;
 #   DROP VIEW vault.decrypted_secrets;
       vault          supabase_admin    false    3    2    2    15    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    17    3    2    2    15    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    17    3    2    2    15    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    17    3    2    2    15    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    17    2    15    3    2    2    15    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    17    3    2    2    15    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    17    3    2    2    15    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    17    3    2    2    15    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    2    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    2    2    15    15    2    15    2    15    15    2    15    2    15    2    15    17    17            �           2604    29714    refresh_tokens id    DEFAULT     r   ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);
 >   ALTER TABLE auth.refresh_tokens ALTER COLUMN id DROP DEFAULT;
       auth          supabase_auth_admin    false    262    261            �          0    29556    audit_log_entries 
   TABLE DATA           [   COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
    auth          supabase_auth_admin    false    253          �          0    29562 
   flow_state 
   TABLE DATA           �   COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
    auth          supabase_auth_admin    false    254   4       �          0    29567 
   identities 
   TABLE DATA           ~   COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
    auth          supabase_auth_admin    false    255   Q       �          0    29574 	   instances 
   TABLE DATA           T   COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
    auth          supabase_auth_admin    false    256   n       �          0    29579    mfa_amr_claims 
   TABLE DATA           e   COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
    auth          supabase_auth_admin    false    257   �       �          0    29584    mfa_challenges 
   TABLE DATA           |   COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
    auth          supabase_auth_admin    false    258   �       �          0    29589    mfa_factors 
   TABLE DATA           �   COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
    auth          supabase_auth_admin    false    259   �       �          0    29594    one_time_tokens 
   TABLE DATA           p   COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
    auth          supabase_auth_admin    false    260   �       �          0    29602    refresh_tokens 
   TABLE DATA           |   COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
    auth          supabase_auth_admin    false    261   �       �          0    29608    saml_providers 
   TABLE DATA           �   COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
    auth          supabase_auth_admin    false    263         �          0    29616    saml_relay_states 
   TABLE DATA           �   COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
    auth          supabase_auth_admin    false    264   9      �          0    29622    schema_migrations 
   TABLE DATA           2   COPY auth.schema_migrations (version) FROM stdin;
    auth          supabase_auth_admin    false    265   V      �          0    29625    sessions 
   TABLE DATA           �   COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
    auth          supabase_auth_admin    false    266   �      �          0    29630    sso_domains 
   TABLE DATA           X   COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
    auth          supabase_auth_admin    false    267   �      �          0    29636    sso_providers 
   TABLE DATA           N   COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
    auth          supabase_auth_admin    false    268   �      �          0    29642    users 
   TABLE DATA           O  COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
    auth          supabase_auth_admin    false    269   	      �          0    29158    key 
   TABLE DATA           �   COPY pgsodium.key (id, status, created, expires, key_type, key_id, key_context, name, associated_data, raw_key, raw_key_nonce, parent_key, comment, user_data) FROM stdin;
    pgsodium          supabase_admin    false    240   &      �          0    29985    Account 
   TABLE DATA           �   COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
    public          postgres    false    280   C      �          0    30137    Album 
   TABLE DATA           v   COPY public."Album" (id, name, description, "coverImage", "createdAt", "updatedAt", "userId", "isPublic") FROM stdin;
    public          postgres    false    298   �      �          0    30045    Category 
   TABLE DATA           .   COPY public."Category" (id, name) FROM stdin;
    public          postgres    false    287   �      �          0    30075    Cuisine 
   TABLE DATA           %  COPY public."Cuisine" (id, name, region, "createdAt", "imageUrl", "updatedAt", "averagePreparationTime", "commonIngredients", "cookingMethods", "culturalContext", description, "dietaryConsiderations", "difficultyLevel", "mealTypes", "parentCuisineId", "spiceProfile", "subRegion") FROM stdin;
    public          postgres    false    291   
      �          0    30129    DietaryFeedback 
   TABLE DATA           �   COPY public."DietaryFeedback" (id, "recipeId", "lowFodmapIncorrect", "fermentedIncorrect", "pescatarianIncorrect", comment, "currentAnalysis", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    297   '      �          0    30023 
   Ingredient 
   TABLE DATA           `   COPY public."Ingredient" (id, name, amount, unit, notes, "recipeId", "isFermented") FROM stdin;
    public          postgres    false    284   D      �          0    30031    Instruction 
   TABLE DATA           R   COPY public."Instruction" (id, "stepNumber", description, "recipeId") FROM stdin;
    public          postgres    false    285   Z~      �          0    30038    NutritionFacts 
   TABLE DATA           e   COPY public."NutritionFacts" (id, protein, carbs, fat, fiber, sugar, sodium, "recipeId") FROM stdin;
    public          postgres    false    286   �E      �          0    30006    Recipe 
   TABLE DATA           X  COPY public."Recipe" (id, "createdAt", "updatedAt", title, description, "cookingTime", servings, difficulty, "cuisineType", "authorId", "isVegetarian", "isVegan", "isGlutenFree", "isNutFree", "jobId", "isFermented", "isLactoseFree", "isLowFodmap", "isPescatarian", "needsDietaryReview", "imageUrl", "regionOfOrigin", search_vector) FROM stdin;
    public          postgres    false    283   �R      �          0    30111    RecipeGenerationJob 
   TABLE DATA              COPY public."RecipeGenerationJob" (id, status, "totalRecipes", completed, failed, "createdAt", "updatedAt", error) FROM stdin;
    public          postgres    false    295   �      �          0    30146    RecipeToAlbum 
   TABLE DATA           O   COPY public."RecipeToAlbum" (id, "albumId", "recipeId", "addedAt") FROM stdin;
    public          postgres    false    299   ��      �          0    30059    Review 
   TABLE DATA           P   COPY public."Review" (id, rating, comment, "createdAt", "recipeId") FROM stdin;
    public          postgres    false    289   �      �          0    29992    Session 
   TABLE DATA           J   COPY public."Session" (id, "sessionToken", "userId", expires) FROM stdin;
    public          postgres    false    281   8�      �          0    30067    StandardIngredient 
   TABLE DATA           \   COPY public."StandardIngredient" (id, name, category, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    290   �      �          0    30052    Tag 
   TABLE DATA           )   COPY public."Tag" (id, name) FROM stdin;
    public          postgres    false    288   7�      �          0    30095    UserAllergy 
   TABLE DATA           l   COPY public."UserAllergy" (id, "ingredientId", "createdAt", "updatedAt", severity, "userEmail") FROM stdin;
    public          postgres    false    293   T�      �          0    30103    UserCuisinePreference 
   TABLE DATA           |   COPY public."UserCuisinePreference" (id, "cuisineId", "preferenceLevel", "createdAt", "updatedAt", "userEmail") FROM stdin;
    public          postgres    false    294   q�      �          0    30083    UserPreference 
   TABLE DATA           �   COPY public."UserPreference" (id, "userEmail", "cookingTime", "mealPrep", "servingSize", "dietTypes", "excludedFoods") FROM stdin;
    public          postgres    false    292   ��      �          0    30121    UserRecipeHistory 
   TABLE DATA           U   COPY public."UserRecipeHistory" (id, "userEmail", "recipeId", "shownAt") FROM stdin;
    public          postgres    false    296    �                 0    30168    _CategoryToRecipe 
   TABLE DATA           7   COPY public."_CategoryToRecipe" ("A", "B") FROM stdin;
    public          postgres    false    302   �                0    30175    _CuisineRecipes 
   TABLE DATA           5   COPY public."_CuisineRecipes" ("A", "B") FROM stdin;
    public          postgres    false    303   :�                0    30182    _RecipeFusionCuisines 
   TABLE DATA           ;   COPY public."_RecipeFusionCuisines" ("A", "B") FROM stdin;
    public          postgres    false    304   W�      �          0    30154    _RecipeToTag 
   TABLE DATA           2   COPY public."_RecipeToTag" ("A", "B") FROM stdin;
    public          postgres    false    300   t�      �          0    30161    _SavedRecipes 
   TABLE DATA           3   COPY public."_SavedRecipes" ("A", "B") FROM stdin;
    public          postgres    false    301   ��                0    31560    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    305   ߡ      �          0    29999    users 
   TABLE DATA           G   COPY public.users (id, email, name, image, email_verified) FROM stdin;
    public          postgres    false    282   I�      �          0    29664    schema_migrations 
   TABLE DATA           C   COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
    realtime          supabase_admin    false    271   $�      �          0    29667    subscription 
   TABLE DATA           b   COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
    realtime          supabase_admin    false    272   (�      �          0    29676    buckets 
   TABLE DATA           �   COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
    storage          supabase_storage_admin    false    274   E�      �          0    29685 
   migrations 
   TABLE DATA           B   COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
    storage          supabase_storage_admin    false    275   b�      �          0    29689    objects 
   TABLE DATA           �   COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
    storage          supabase_storage_admin    false    276   (�      �          0    29699    s3_multipart_uploads 
   TABLE DATA           �   COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
    storage          supabase_storage_admin    false    277   E�      �          0    29706    s3_multipart_uploads_parts 
   TABLE DATA           �   COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
    storage          supabase_storage_admin    false    278   b�      �          0    29406    secrets 
   TABLE DATA           f   COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
    vault          supabase_admin    false    248   �      �           0    0    refresh_tokens_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);
          auth          supabase_auth_admin    false    262            �           0    0    key_key_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('pgsodium.key_key_id_seq', 1, false);
          pgsodium          supabase_admin    false    239            �           0    0    subscription_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);
          realtime          supabase_admin    false    273            H           2606    29716    mfa_amr_claims amr_id_pk 
   CONSTRAINT     T   ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY auth.mfa_amr_claims DROP CONSTRAINT amr_id_pk;
       auth            supabase_auth_admin    false    257            8           2606    29718 (   audit_log_entries audit_log_entries_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY auth.audit_log_entries DROP CONSTRAINT audit_log_entries_pkey;
       auth            supabase_auth_admin    false    253            <           2606    29720    flow_state flow_state_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY auth.flow_state DROP CONSTRAINT flow_state_pkey;
       auth            supabase_auth_admin    false    254            A           2606    29722    identities identities_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY auth.identities DROP CONSTRAINT identities_pkey;
       auth            supabase_auth_admin    false    255            C           2606    29724 1   identities identities_provider_id_provider_unique 
   CONSTRAINT     {   ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);
 Y   ALTER TABLE ONLY auth.identities DROP CONSTRAINT identities_provider_id_provider_unique;
       auth            supabase_auth_admin    false    255    255            F           2606    29726    instances instances_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY auth.instances DROP CONSTRAINT instances_pkey;
       auth            supabase_auth_admin    false    256            J           2606    29728 C   mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);
 k   ALTER TABLE ONLY auth.mfa_amr_claims DROP CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey;
       auth            supabase_auth_admin    false    257    257            M           2606    29730 "   mfa_challenges mfa_challenges_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY auth.mfa_challenges DROP CONSTRAINT mfa_challenges_pkey;
       auth            supabase_auth_admin    false    258            P           2606    29732 .   mfa_factors mfa_factors_last_challenged_at_key 
   CONSTRAINT     u   ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);
 V   ALTER TABLE ONLY auth.mfa_factors DROP CONSTRAINT mfa_factors_last_challenged_at_key;
       auth            supabase_auth_admin    false    259            R           2606    29734    mfa_factors mfa_factors_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY auth.mfa_factors DROP CONSTRAINT mfa_factors_pkey;
       auth            supabase_auth_admin    false    259            W           2606    29736 $   one_time_tokens one_time_tokens_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY auth.one_time_tokens DROP CONSTRAINT one_time_tokens_pkey;
       auth            supabase_auth_admin    false    260            _           2606    29738 "   refresh_tokens refresh_tokens_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY auth.refresh_tokens DROP CONSTRAINT refresh_tokens_pkey;
       auth            supabase_auth_admin    false    261            b           2606    29740 *   refresh_tokens refresh_tokens_token_unique 
   CONSTRAINT     d   ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);
 R   ALTER TABLE ONLY auth.refresh_tokens DROP CONSTRAINT refresh_tokens_token_unique;
       auth            supabase_auth_admin    false    261            e           2606    29742 +   saml_providers saml_providers_entity_id_key 
   CONSTRAINT     i   ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);
 S   ALTER TABLE ONLY auth.saml_providers DROP CONSTRAINT saml_providers_entity_id_key;
       auth            supabase_auth_admin    false    263            g           2606    29744 "   saml_providers saml_providers_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY auth.saml_providers DROP CONSTRAINT saml_providers_pkey;
       auth            supabase_auth_admin    false    263            l           2606    29746 (   saml_relay_states saml_relay_states_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY auth.saml_relay_states DROP CONSTRAINT saml_relay_states_pkey;
       auth            supabase_auth_admin    false    264            o           2606    29748 (   schema_migrations schema_migrations_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);
 P   ALTER TABLE ONLY auth.schema_migrations DROP CONSTRAINT schema_migrations_pkey;
       auth            supabase_auth_admin    false    265            r           2606    29750    sessions sessions_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY auth.sessions DROP CONSTRAINT sessions_pkey;
       auth            supabase_auth_admin    false    266            w           2606    29752    sso_domains sso_domains_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY auth.sso_domains DROP CONSTRAINT sso_domains_pkey;
       auth            supabase_auth_admin    false    267            z           2606    29754     sso_providers sso_providers_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY auth.sso_providers DROP CONSTRAINT sso_providers_pkey;
       auth            supabase_auth_admin    false    268            �           2606    29756    users users_phone_key 
   CONSTRAINT     O   ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);
 =   ALTER TABLE ONLY auth.users DROP CONSTRAINT users_phone_key;
       auth            supabase_auth_admin    false    269            �           2606    29758    users users_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY auth.users DROP CONSTRAINT users_pkey;
       auth            supabase_auth_admin    false    269            �           2606    29991    Account Account_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Account" DROP CONSTRAINT "Account_pkey";
       public            postgres    false    280            �           2606    30145    Album Album_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Album"
    ADD CONSTRAINT "Album_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Album" DROP CONSTRAINT "Album_pkey";
       public            postgres    false    298            �           2606    30051    Category Category_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Category" DROP CONSTRAINT "Category_pkey";
       public            postgres    false    287            �           2606    30082    Cuisine Cuisine_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Cuisine"
    ADD CONSTRAINT "Cuisine_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Cuisine" DROP CONSTRAINT "Cuisine_pkey";
       public            postgres    false    291            �           2606    30136 $   DietaryFeedback DietaryFeedback_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."DietaryFeedback"
    ADD CONSTRAINT "DietaryFeedback_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."DietaryFeedback" DROP CONSTRAINT "DietaryFeedback_pkey";
       public            postgres    false    297            �           2606    30030    Ingredient Ingredient_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Ingredient"
    ADD CONSTRAINT "Ingredient_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Ingredient" DROP CONSTRAINT "Ingredient_pkey";
       public            postgres    false    284            �           2606    30037    Instruction Instruction_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Instruction"
    ADD CONSTRAINT "Instruction_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Instruction" DROP CONSTRAINT "Instruction_pkey";
       public            postgres    false    285            �           2606    30044 "   NutritionFacts NutritionFacts_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."NutritionFacts"
    ADD CONSTRAINT "NutritionFacts_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."NutritionFacts" DROP CONSTRAINT "NutritionFacts_pkey";
       public            postgres    false    286            �           2606    30120 ,   RecipeGenerationJob RecipeGenerationJob_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."RecipeGenerationJob"
    ADD CONSTRAINT "RecipeGenerationJob_pkey" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."RecipeGenerationJob" DROP CONSTRAINT "RecipeGenerationJob_pkey";
       public            postgres    false    295            �           2606    30153     RecipeToAlbum RecipeToAlbum_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."RecipeToAlbum"
    ADD CONSTRAINT "RecipeToAlbum_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."RecipeToAlbum" DROP CONSTRAINT "RecipeToAlbum_pkey";
       public            postgres    false    299            �           2606    30022    Recipe Recipe_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Recipe"
    ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Recipe" DROP CONSTRAINT "Recipe_pkey";
       public            postgres    false    283            �           2606    30066    Review Review_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Review" DROP CONSTRAINT "Review_pkey";
       public            postgres    false    289            �           2606    29998    Session Session_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Session" DROP CONSTRAINT "Session_pkey";
       public            postgres    false    281            �           2606    30074 *   StandardIngredient StandardIngredient_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."StandardIngredient"
    ADD CONSTRAINT "StandardIngredient_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."StandardIngredient" DROP CONSTRAINT "StandardIngredient_pkey";
       public            postgres    false    290            �           2606    30058    Tag Tag_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."Tag" DROP CONSTRAINT "Tag_pkey";
       public            postgres    false    288            �           2606    30102    UserAllergy UserAllergy_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."UserAllergy"
    ADD CONSTRAINT "UserAllergy_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."UserAllergy" DROP CONSTRAINT "UserAllergy_pkey";
       public            postgres    false    293            �           2606    30110 0   UserCuisinePreference UserCuisinePreference_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public."UserCuisinePreference"
    ADD CONSTRAINT "UserCuisinePreference_pkey" PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public."UserCuisinePreference" DROP CONSTRAINT "UserCuisinePreference_pkey";
       public            postgres    false    294            �           2606    30094 "   UserPreference UserPreference_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."UserPreference"
    ADD CONSTRAINT "UserPreference_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."UserPreference" DROP CONSTRAINT "UserPreference_pkey";
       public            postgres    false    292            �           2606    30128 (   UserRecipeHistory UserRecipeHistory_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."UserRecipeHistory"
    ADD CONSTRAINT "UserRecipeHistory_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."UserRecipeHistory" DROP CONSTRAINT "UserRecipeHistory_pkey";
       public            postgres    false    296            �           2606    30174 +   _CategoryToRecipe _CategoryToRecipe_AB_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public."_CategoryToRecipe"
    ADD CONSTRAINT "_CategoryToRecipe_AB_pkey" PRIMARY KEY ("A", "B");
 Y   ALTER TABLE ONLY public."_CategoryToRecipe" DROP CONSTRAINT "_CategoryToRecipe_AB_pkey";
       public            postgres    false    302    302            �           2606    30181 '   _CuisineRecipes _CuisineRecipes_AB_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public."_CuisineRecipes"
    ADD CONSTRAINT "_CuisineRecipes_AB_pkey" PRIMARY KEY ("A", "B");
 U   ALTER TABLE ONLY public."_CuisineRecipes" DROP CONSTRAINT "_CuisineRecipes_AB_pkey";
       public            postgres    false    303    303            �           2606    30188 3   _RecipeFusionCuisines _RecipeFusionCuisines_AB_pkey 
   CONSTRAINT     {   ALTER TABLE ONLY public."_RecipeFusionCuisines"
    ADD CONSTRAINT "_RecipeFusionCuisines_AB_pkey" PRIMARY KEY ("A", "B");
 a   ALTER TABLE ONLY public."_RecipeFusionCuisines" DROP CONSTRAINT "_RecipeFusionCuisines_AB_pkey";
       public            postgres    false    304    304            �           2606    30160 !   _RecipeToTag _RecipeToTag_AB_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public."_RecipeToTag"
    ADD CONSTRAINT "_RecipeToTag_AB_pkey" PRIMARY KEY ("A", "B");
 O   ALTER TABLE ONLY public."_RecipeToTag" DROP CONSTRAINT "_RecipeToTag_AB_pkey";
       public            postgres    false    300    300            �           2606    30167 #   _SavedRecipes _SavedRecipes_AB_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public."_SavedRecipes"
    ADD CONSTRAINT "_SavedRecipes_AB_pkey" PRIMARY KEY ("A", "B");
 Q   ALTER TABLE ONLY public."_SavedRecipes" DROP CONSTRAINT "_SavedRecipes_AB_pkey";
       public            postgres    false    301    301            �           2606    31568 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    305            �           2606    30005    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    282            �           2606    29760    messages messages_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);
 B   ALTER TABLE ONLY realtime.messages DROP CONSTRAINT messages_pkey;
       realtime            supabase_realtime_admin    false    270    270            �           2606    29762    subscription pk_subscription 
   CONSTRAINT     \   ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);
 H   ALTER TABLE ONLY realtime.subscription DROP CONSTRAINT pk_subscription;
       realtime            supabase_admin    false    272            �           2606    29764 (   schema_migrations schema_migrations_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);
 T   ALTER TABLE ONLY realtime.schema_migrations DROP CONSTRAINT schema_migrations_pkey;
       realtime            supabase_admin    false    271            �           2606    29766    buckets buckets_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY storage.buckets DROP CONSTRAINT buckets_pkey;
       storage            supabase_storage_admin    false    274            �           2606    29768    migrations migrations_name_key 
   CONSTRAINT     Z   ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);
 I   ALTER TABLE ONLY storage.migrations DROP CONSTRAINT migrations_name_key;
       storage            supabase_storage_admin    false    275            �           2606    29770    migrations migrations_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 E   ALTER TABLE ONLY storage.migrations DROP CONSTRAINT migrations_pkey;
       storage            supabase_storage_admin    false    275            �           2606    29772    objects objects_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY storage.objects DROP CONSTRAINT objects_pkey;
       storage            supabase_storage_admin    false    276            �           2606    29774 :   s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);
 e   ALTER TABLE ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT s3_multipart_uploads_parts_pkey;
       storage            supabase_storage_admin    false    278            �           2606    29776 .   s3_multipart_uploads s3_multipart_uploads_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);
 Y   ALTER TABLE ONLY storage.s3_multipart_uploads DROP CONSTRAINT s3_multipart_uploads_pkey;
       storage            supabase_storage_admin    false    277            9           1259    29777    audit_logs_instance_id_idx    INDEX     ]   CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);
 ,   DROP INDEX auth.audit_logs_instance_id_idx;
       auth            supabase_auth_admin    false    253            |           1259    29778    confirmation_token_idx    INDEX     �   CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);
 (   DROP INDEX auth.confirmation_token_idx;
       auth            supabase_auth_admin    false    269    269            }           1259    29779    email_change_token_current_idx    INDEX     �   CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);
 0   DROP INDEX auth.email_change_token_current_idx;
       auth            supabase_auth_admin    false    269    269            ~           1259    29780    email_change_token_new_idx    INDEX     �   CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);
 ,   DROP INDEX auth.email_change_token_new_idx;
       auth            supabase_auth_admin    false    269    269            N           1259    29781    factor_id_created_at_idx    INDEX     ]   CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);
 *   DROP INDEX auth.factor_id_created_at_idx;
       auth            supabase_auth_admin    false    259    259            :           1259    29782    flow_state_created_at_idx    INDEX     Y   CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);
 +   DROP INDEX auth.flow_state_created_at_idx;
       auth            supabase_auth_admin    false    254            ?           1259    29783    identities_email_idx    INDEX     [   CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);
 &   DROP INDEX auth.identities_email_idx;
       auth            supabase_auth_admin    false    255            �           0    0    INDEX identities_email_idx    COMMENT     c   COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';
          auth          supabase_auth_admin    false    3903            D           1259    29784    identities_user_id_idx    INDEX     N   CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);
 (   DROP INDEX auth.identities_user_id_idx;
       auth            supabase_auth_admin    false    255            =           1259    29785    idx_auth_code    INDEX     G   CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);
    DROP INDEX auth.idx_auth_code;
       auth            supabase_auth_admin    false    254            >           1259    29786    idx_user_id_auth_method    INDEX     f   CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);
 )   DROP INDEX auth.idx_user_id_auth_method;
       auth            supabase_auth_admin    false    254    254            K           1259    29787    mfa_challenge_created_at_idx    INDEX     `   CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);
 .   DROP INDEX auth.mfa_challenge_created_at_idx;
       auth            supabase_auth_admin    false    258            S           1259    29788 %   mfa_factors_user_friendly_name_unique    INDEX     �   CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);
 7   DROP INDEX auth.mfa_factors_user_friendly_name_unique;
       auth            supabase_auth_admin    false    259    259    259            T           1259    29789    mfa_factors_user_id_idx    INDEX     P   CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);
 )   DROP INDEX auth.mfa_factors_user_id_idx;
       auth            supabase_auth_admin    false    259            X           1259    29790 #   one_time_tokens_relates_to_hash_idx    INDEX     b   CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);
 5   DROP INDEX auth.one_time_tokens_relates_to_hash_idx;
       auth            supabase_auth_admin    false    260            Y           1259    29791 #   one_time_tokens_token_hash_hash_idx    INDEX     b   CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);
 5   DROP INDEX auth.one_time_tokens_token_hash_hash_idx;
       auth            supabase_auth_admin    false    260            Z           1259    29792 &   one_time_tokens_user_id_token_type_key    INDEX     v   CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);
 8   DROP INDEX auth.one_time_tokens_user_id_token_type_key;
       auth            supabase_auth_admin    false    260    260                       1259    29793    reauthentication_token_idx    INDEX     �   CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);
 ,   DROP INDEX auth.reauthentication_token_idx;
       auth            supabase_auth_admin    false    269    269            �           1259    29794    recovery_token_idx    INDEX     �   CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);
 $   DROP INDEX auth.recovery_token_idx;
       auth            supabase_auth_admin    false    269    269            [           1259    29795    refresh_tokens_instance_id_idx    INDEX     ^   CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);
 0   DROP INDEX auth.refresh_tokens_instance_id_idx;
       auth            supabase_auth_admin    false    261            \           1259    29796 &   refresh_tokens_instance_id_user_id_idx    INDEX     o   CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);
 8   DROP INDEX auth.refresh_tokens_instance_id_user_id_idx;
       auth            supabase_auth_admin    false    261    261            ]           1259    29797    refresh_tokens_parent_idx    INDEX     T   CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);
 +   DROP INDEX auth.refresh_tokens_parent_idx;
       auth            supabase_auth_admin    false    261            `           1259    29798 %   refresh_tokens_session_id_revoked_idx    INDEX     m   CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);
 7   DROP INDEX auth.refresh_tokens_session_id_revoked_idx;
       auth            supabase_auth_admin    false    261    261            c           1259    29799    refresh_tokens_updated_at_idx    INDEX     a   CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);
 /   DROP INDEX auth.refresh_tokens_updated_at_idx;
       auth            supabase_auth_admin    false    261            h           1259    29800 "   saml_providers_sso_provider_id_idx    INDEX     f   CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);
 4   DROP INDEX auth.saml_providers_sso_provider_id_idx;
       auth            supabase_auth_admin    false    263            i           1259    29801     saml_relay_states_created_at_idx    INDEX     g   CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);
 2   DROP INDEX auth.saml_relay_states_created_at_idx;
       auth            supabase_auth_admin    false    264            j           1259    29802    saml_relay_states_for_email_idx    INDEX     `   CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);
 1   DROP INDEX auth.saml_relay_states_for_email_idx;
       auth            supabase_auth_admin    false    264            m           1259    29803 %   saml_relay_states_sso_provider_id_idx    INDEX     l   CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);
 7   DROP INDEX auth.saml_relay_states_sso_provider_id_idx;
       auth            supabase_auth_admin    false    264            p           1259    29804    sessions_not_after_idx    INDEX     S   CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);
 (   DROP INDEX auth.sessions_not_after_idx;
       auth            supabase_auth_admin    false    266            s           1259    29805    sessions_user_id_idx    INDEX     J   CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);
 &   DROP INDEX auth.sessions_user_id_idx;
       auth            supabase_auth_admin    false    266            u           1259    29806    sso_domains_domain_idx    INDEX     \   CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));
 (   DROP INDEX auth.sso_domains_domain_idx;
       auth            supabase_auth_admin    false    267    267            x           1259    29807    sso_domains_sso_provider_id_idx    INDEX     `   CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);
 1   DROP INDEX auth.sso_domains_sso_provider_id_idx;
       auth            supabase_auth_admin    false    267            {           1259    29808    sso_providers_resource_id_idx    INDEX     j   CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));
 /   DROP INDEX auth.sso_providers_resource_id_idx;
       auth            supabase_auth_admin    false    268    268            U           1259    29809    unique_phone_factor_per_user    INDEX     c   CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);
 .   DROP INDEX auth.unique_phone_factor_per_user;
       auth            supabase_auth_admin    false    259    259            t           1259    29810    user_id_created_at_idx    INDEX     X   CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);
 (   DROP INDEX auth.user_id_created_at_idx;
       auth            supabase_auth_admin    false    266    266            �           1259    29811    users_email_partial_key    INDEX     k   CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);
 )   DROP INDEX auth.users_email_partial_key;
       auth            supabase_auth_admin    false    269    269            �           0    0    INDEX users_email_partial_key    COMMENT     }   COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';
          auth          supabase_auth_admin    false    3969            �           1259    29812    users_instance_id_email_idx    INDEX     h   CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));
 -   DROP INDEX auth.users_instance_id_email_idx;
       auth            supabase_auth_admin    false    269    269            �           1259    29813    users_instance_id_idx    INDEX     L   CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);
 '   DROP INDEX auth.users_instance_id_idx;
       auth            supabase_auth_admin    false    269            �           1259    29814    users_is_anonymous_idx    INDEX     N   CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);
 (   DROP INDEX auth.users_is_anonymous_idx;
       auth            supabase_auth_admin    false    269            �           1259    30189 &   Account_provider_providerAccountId_key    INDEX     ~   CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");
 <   DROP INDEX public."Account_provider_providerAccountId_key";
       public            postgres    false    280    280            �           1259    30212    Album_userId_idx    INDEX     J   CREATE INDEX "Album_userId_idx" ON public."Album" USING btree ("userId");
 &   DROP INDEX public."Album_userId_idx";
       public            postgres    false    298            �           1259    30199    Category_name_key    INDEX     Q   CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);
 '   DROP INDEX public."Category_name_key";
       public            postgres    false    287            �           1259    30205    Cuisine_name_idx    INDEX     H   CREATE INDEX "Cuisine_name_idx" ON public."Cuisine" USING btree (name);
 &   DROP INDEX public."Cuisine_name_idx";
       public            postgres    false    291            �           1259    30203    Cuisine_name_key    INDEX     O   CREATE UNIQUE INDEX "Cuisine_name_key" ON public."Cuisine" USING btree (name);
 &   DROP INDEX public."Cuisine_name_key";
       public            postgres    false    291            �           1259    30204    Cuisine_region_subRegion_idx    INDEX     c   CREATE INDEX "Cuisine_region_subRegion_idx" ON public."Cuisine" USING btree (region, "subRegion");
 2   DROP INDEX public."Cuisine_region_subRegion_idx";
       public            postgres    false    291    291            �           1259    30211    DietaryFeedback_recipeId_idx    INDEX     b   CREATE INDEX "DietaryFeedback_recipeId_idx" ON public."DietaryFeedback" USING btree ("recipeId");
 2   DROP INDEX public."DietaryFeedback_recipeId_idx";
       public            postgres    false    297            �           1259    30196    Ingredient_recipeId_idx    INDEX     X   CREATE INDEX "Ingredient_recipeId_idx" ON public."Ingredient" USING btree ("recipeId");
 -   DROP INDEX public."Ingredient_recipeId_idx";
       public            postgres    false    284            �           1259    30197    Instruction_recipeId_idx    INDEX     Z   CREATE INDEX "Instruction_recipeId_idx" ON public."Instruction" USING btree ("recipeId");
 .   DROP INDEX public."Instruction_recipeId_idx";
       public            postgres    false    285            �           1259    30198    NutritionFacts_recipeId_key    INDEX     g   CREATE UNIQUE INDEX "NutritionFacts_recipeId_key" ON public."NutritionFacts" USING btree ("recipeId");
 1   DROP INDEX public."NutritionFacts_recipeId_key";
       public            postgres    false    286            �           1259    30213    RecipeToAlbum_albumId_idx    INDEX     \   CREATE INDEX "RecipeToAlbum_albumId_idx" ON public."RecipeToAlbum" USING btree ("albumId");
 /   DROP INDEX public."RecipeToAlbum_albumId_idx";
       public            postgres    false    299            �           1259    30215 "   RecipeToAlbum_albumId_recipeId_key    INDEX     x   CREATE UNIQUE INDEX "RecipeToAlbum_albumId_recipeId_key" ON public."RecipeToAlbum" USING btree ("albumId", "recipeId");
 8   DROP INDEX public."RecipeToAlbum_albumId_recipeId_key";
       public            postgres    false    299    299            �           1259    30214    RecipeToAlbum_recipeId_idx    INDEX     ^   CREATE INDEX "RecipeToAlbum_recipeId_idx" ON public."RecipeToAlbum" USING btree ("recipeId");
 0   DROP INDEX public."RecipeToAlbum_recipeId_idx";
       public            postgres    false    299            �           1259    30193    Recipe_authorId_idx    INDEX     P   CREATE INDEX "Recipe_authorId_idx" ON public."Recipe" USING btree ("authorId");
 )   DROP INDEX public."Recipe_authorId_idx";
       public            postgres    false    283            �           1259    30194    Recipe_jobId_idx    INDEX     J   CREATE INDEX "Recipe_jobId_idx" ON public."Recipe" USING btree ("jobId");
 &   DROP INDEX public."Recipe_jobId_idx";
       public            postgres    false    283            �           1259    30195    Recipe_search_vector_idx    INDEX     V   CREATE INDEX "Recipe_search_vector_idx" ON public."Recipe" USING gin (search_vector);
 .   DROP INDEX public."Recipe_search_vector_idx";
       public            postgres    false    283            �           1259    30192    Recipe_title_key    INDEX     O   CREATE UNIQUE INDEX "Recipe_title_key" ON public."Recipe" USING btree (title);
 &   DROP INDEX public."Recipe_title_key";
       public            postgres    false    283            �           1259    30201    Review_recipeId_idx    INDEX     P   CREATE INDEX "Review_recipeId_idx" ON public."Review" USING btree ("recipeId");
 )   DROP INDEX public."Review_recipeId_idx";
       public            postgres    false    289            �           1259    30190    Session_sessionToken_key    INDEX     a   CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");
 .   DROP INDEX public."Session_sessionToken_key";
       public            postgres    false    281            �           1259    30202    StandardIngredient_name_key    INDEX     e   CREATE UNIQUE INDEX "StandardIngredient_name_key" ON public."StandardIngredient" USING btree (name);
 1   DROP INDEX public."StandardIngredient_name_key";
       public            postgres    false    290            �           1259    30200    Tag_name_key    INDEX     G   CREATE UNIQUE INDEX "Tag_name_key" ON public."Tag" USING btree (name);
 "   DROP INDEX public."Tag_name_key";
       public            postgres    false    288            �           1259    30207 &   UserAllergy_userEmail_ingredientId_key    INDEX     �   CREATE UNIQUE INDEX "UserAllergy_userEmail_ingredientId_key" ON public."UserAllergy" USING btree ("userEmail", "ingredientId");
 <   DROP INDEX public."UserAllergy_userEmail_ingredientId_key";
       public            postgres    false    293    293            �           1259    30208 -   UserCuisinePreference_userEmail_cuisineId_key    INDEX     �   CREATE UNIQUE INDEX "UserCuisinePreference_userEmail_cuisineId_key" ON public."UserCuisinePreference" USING btree ("userEmail", "cuisineId");
 C   DROP INDEX public."UserCuisinePreference_userEmail_cuisineId_key";
       public            postgres    false    294    294            �           1259    30206    UserPreference_userEmail_key    INDEX     i   CREATE UNIQUE INDEX "UserPreference_userEmail_key" ON public."UserPreference" USING btree ("userEmail");
 2   DROP INDEX public."UserPreference_userEmail_key";
       public            postgres    false    292            �           1259    30210    UserRecipeHistory_recipeId_idx    INDEX     f   CREATE INDEX "UserRecipeHistory_recipeId_idx" ON public."UserRecipeHistory" USING btree ("recipeId");
 4   DROP INDEX public."UserRecipeHistory_recipeId_idx";
       public            postgres    false    296            �           1259    30209 '   UserRecipeHistory_userEmail_shownAt_idx    INDEX     {   CREATE INDEX "UserRecipeHistory_userEmail_shownAt_idx" ON public."UserRecipeHistory" USING btree ("userEmail", "shownAt");
 =   DROP INDEX public."UserRecipeHistory_userEmail_shownAt_idx";
       public            postgres    false    296    296            �           1259    30218    _CategoryToRecipe_B_index    INDEX     Z   CREATE INDEX "_CategoryToRecipe_B_index" ON public."_CategoryToRecipe" USING btree ("B");
 /   DROP INDEX public."_CategoryToRecipe_B_index";
       public            postgres    false    302            �           1259    30219    _CuisineRecipes_B_index    INDEX     V   CREATE INDEX "_CuisineRecipes_B_index" ON public."_CuisineRecipes" USING btree ("B");
 -   DROP INDEX public."_CuisineRecipes_B_index";
       public            postgres    false    303            �           1259    30220    _RecipeFusionCuisines_B_index    INDEX     b   CREATE INDEX "_RecipeFusionCuisines_B_index" ON public."_RecipeFusionCuisines" USING btree ("B");
 3   DROP INDEX public."_RecipeFusionCuisines_B_index";
       public            postgres    false    304            �           1259    30216    _RecipeToTag_B_index    INDEX     P   CREATE INDEX "_RecipeToTag_B_index" ON public."_RecipeToTag" USING btree ("B");
 *   DROP INDEX public."_RecipeToTag_B_index";
       public            postgres    false    300            �           1259    30217    _SavedRecipes_B_index    INDEX     R   CREATE INDEX "_SavedRecipes_B_index" ON public."_SavedRecipes" USING btree ("B");
 +   DROP INDEX public."_SavedRecipes_B_index";
       public            postgres    false    301            �           1259    30191    users_email_key    INDEX     I   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
 #   DROP INDEX public.users_email_key;
       public            postgres    false    282            �           1259    29815    ix_realtime_subscription_entity    INDEX     \   CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);
 5   DROP INDEX realtime.ix_realtime_subscription_entity;
       realtime            supabase_admin    false    272            �           1259    29816 /   subscription_subscription_id_entity_filters_key    INDEX     �   CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);
 E   DROP INDEX realtime.subscription_subscription_id_entity_filters_key;
       realtime            supabase_admin    false    272    272    272            �           1259    29817    bname    INDEX     A   CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);
    DROP INDEX storage.bname;
       storage            supabase_storage_admin    false    274            �           1259    29818    bucketid_objname    INDEX     W   CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);
 %   DROP INDEX storage.bucketid_objname;
       storage            supabase_storage_admin    false    276    276            �           1259    29819    idx_multipart_uploads_list    INDEX     r   CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);
 /   DROP INDEX storage.idx_multipart_uploads_list;
       storage            supabase_storage_admin    false    277    277    277            �           1259    29820    idx_objects_bucket_id_name    INDEX     f   CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");
 /   DROP INDEX storage.idx_objects_bucket_id_name;
       storage            supabase_storage_admin    false    276    276            �           1259    29821    name_prefix_search    INDEX     X   CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);
 '   DROP INDEX storage.name_prefix_search;
       storage            supabase_storage_admin    false    276            #           2620    29822    subscription tr_check_filters    TRIGGER     �   CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();
 8   DROP TRIGGER tr_check_filters ON realtime.subscription;
       realtime          supabase_admin    false    536    272            $           2620    29823 !   objects update_objects_updated_at    TRIGGER     �   CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();
 ;   DROP TRIGGER update_objects_updated_at ON storage.objects;
       storage          supabase_storage_admin    false    276    493            �           2606    29824 "   identities identities_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY auth.identities DROP CONSTRAINT identities_user_id_fkey;
       auth          supabase_auth_admin    false    269    255    3976            �           2606    29829 -   mfa_amr_claims mfa_amr_claims_session_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;
 U   ALTER TABLE ONLY auth.mfa_amr_claims DROP CONSTRAINT mfa_amr_claims_session_id_fkey;
       auth          supabase_auth_admin    false    3954    266    257            �           2606    29834 1   mfa_challenges mfa_challenges_auth_factor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;
 Y   ALTER TABLE ONLY auth.mfa_challenges DROP CONSTRAINT mfa_challenges_auth_factor_id_fkey;
       auth          supabase_auth_admin    false    259    258    3922            �           2606    29839 $   mfa_factors mfa_factors_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY auth.mfa_factors DROP CONSTRAINT mfa_factors_user_id_fkey;
       auth          supabase_auth_admin    false    269    3976    259            �           2606    29844 ,   one_time_tokens one_time_tokens_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY auth.one_time_tokens DROP CONSTRAINT one_time_tokens_user_id_fkey;
       auth          supabase_auth_admin    false    3976    260    269            �           2606    29849 -   refresh_tokens refresh_tokens_session_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;
 U   ALTER TABLE ONLY auth.refresh_tokens DROP CONSTRAINT refresh_tokens_session_id_fkey;
       auth          supabase_auth_admin    false    3954    266    261            �           2606    29854 2   saml_providers saml_providers_sso_provider_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY auth.saml_providers DROP CONSTRAINT saml_providers_sso_provider_id_fkey;
       auth          supabase_auth_admin    false    263    3962    268            �           2606    29859 6   saml_relay_states saml_relay_states_flow_state_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY auth.saml_relay_states DROP CONSTRAINT saml_relay_states_flow_state_id_fkey;
       auth          supabase_auth_admin    false    264    3900    254            �           2606    29864 8   saml_relay_states saml_relay_states_sso_provider_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY auth.saml_relay_states DROP CONSTRAINT saml_relay_states_sso_provider_id_fkey;
       auth          supabase_auth_admin    false    268    3962    264            �           2606    29869    sessions sessions_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY auth.sessions DROP CONSTRAINT sessions_user_id_fkey;
       auth          supabase_auth_admin    false    269    266    3976                        2606    29874 ,   sso_domains sso_domains_sso_provider_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY auth.sso_domains DROP CONSTRAINT sso_domains_sso_provider_id_fkey;
       auth          supabase_auth_admin    false    268    3962    267                       2606    30221    Account Account_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Account" DROP CONSTRAINT "Account_userId_fkey";
       public          postgres    false    4010    280    282                       2606    30306    Album Album_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Album"
    ADD CONSTRAINT "Album_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public."Album" DROP CONSTRAINT "Album_userId_fkey";
       public          postgres    false    298    4010    282                       2606    30261 $   Cuisine Cuisine_parentCuisineId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Cuisine"
    ADD CONSTRAINT "Cuisine_parentCuisineId_fkey" FOREIGN KEY ("parentCuisineId") REFERENCES public."Cuisine"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 R   ALTER TABLE ONLY public."Cuisine" DROP CONSTRAINT "Cuisine_parentCuisineId_fkey";
       public          postgres    false    291    291    4041                       2606    30301 -   DietaryFeedback DietaryFeedback_recipeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DietaryFeedback"
    ADD CONSTRAINT "DietaryFeedback_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 [   ALTER TABLE ONLY public."DietaryFeedback" DROP CONSTRAINT "DietaryFeedback_recipeId_fkey";
       public          postgres    false    4014    283    297            	           2606    30241 #   Ingredient Ingredient_recipeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Ingredient"
    ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";
       public          postgres    false    284    4014    283            
           2606    30246 %   Instruction Instruction_recipeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Instruction"
    ADD CONSTRAINT "Instruction_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public."Instruction" DROP CONSTRAINT "Instruction_recipeId_fkey";
       public          postgres    false    4014    283    285                       2606    30251 +   NutritionFacts NutritionFacts_recipeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."NutritionFacts"
    ADD CONSTRAINT "NutritionFacts_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public."NutritionFacts" DROP CONSTRAINT "NutritionFacts_recipeId_fkey";
       public          postgres    false    4014    283    286                       2606    30311 (   RecipeToAlbum RecipeToAlbum_albumId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecipeToAlbum"
    ADD CONSTRAINT "RecipeToAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES public."Album"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public."RecipeToAlbum" DROP CONSTRAINT "RecipeToAlbum_albumId_fkey";
       public          postgres    false    4062    299    298                       2606    30316 )   RecipeToAlbum RecipeToAlbum_recipeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecipeToAlbum"
    ADD CONSTRAINT "RecipeToAlbum_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public."RecipeToAlbum" DROP CONSTRAINT "RecipeToAlbum_recipeId_fkey";
       public          postgres    false    4014    299    283                       2606    30231    Recipe Recipe_authorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Recipe"
    ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Recipe" DROP CONSTRAINT "Recipe_authorId_fkey";
       public          postgres    false    283    4010    282                       2606    30236    Recipe Recipe_jobId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Recipe"
    ADD CONSTRAINT "Recipe_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public."RecipeGenerationJob"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 F   ALTER TABLE ONLY public."Recipe" DROP CONSTRAINT "Recipe_jobId_fkey";
       public          postgres    false    4053    283    295                       2606    30256    Review Review_recipeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Review" DROP CONSTRAINT "Review_recipeId_fkey";
       public          postgres    false    289    283    4014                       2606    30226    Session Session_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Session" DROP CONSTRAINT "Session_userId_fkey";
       public          postgres    false    281    282    4010                       2606    30271 )   UserAllergy UserAllergy_ingredientId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserAllergy"
    ADD CONSTRAINT "UserAllergy_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES public."StandardIngredient"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 W   ALTER TABLE ONLY public."UserAllergy" DROP CONSTRAINT "UserAllergy_ingredientId_fkey";
       public          postgres    false    290    293    4037                       2606    30276 &   UserAllergy UserAllergy_userEmail_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserAllergy"
    ADD CONSTRAINT "UserAllergy_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES public.users(email) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public."UserAllergy" DROP CONSTRAINT "UserAllergy_userEmail_fkey";
       public          postgres    false    293    282    4008                       2606    30281 :   UserCuisinePreference UserCuisinePreference_cuisineId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserCuisinePreference"
    ADD CONSTRAINT "UserCuisinePreference_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES public."Cuisine"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 h   ALTER TABLE ONLY public."UserCuisinePreference" DROP CONSTRAINT "UserCuisinePreference_cuisineId_fkey";
       public          postgres    false    4041    294    291                       2606    30286 :   UserCuisinePreference UserCuisinePreference_userEmail_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserCuisinePreference"
    ADD CONSTRAINT "UserCuisinePreference_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES public.users(email) ON UPDATE CASCADE ON DELETE RESTRICT;
 h   ALTER TABLE ONLY public."UserCuisinePreference" DROP CONSTRAINT "UserCuisinePreference_userEmail_fkey";
       public          postgres    false    4008    282    294                       2606    30266 ,   UserPreference UserPreference_userEmail_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserPreference"
    ADD CONSTRAINT "UserPreference_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES public.users(email) ON UPDATE CASCADE ON DELETE RESTRICT;
 Z   ALTER TABLE ONLY public."UserPreference" DROP CONSTRAINT "UserPreference_userEmail_fkey";
       public          postgres    false    4008    292    282                       2606    30291 1   UserRecipeHistory UserRecipeHistory_recipeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserRecipeHistory"
    ADD CONSTRAINT "UserRecipeHistory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 _   ALTER TABLE ONLY public."UserRecipeHistory" DROP CONSTRAINT "UserRecipeHistory_recipeId_fkey";
       public          postgres    false    4014    296    283                       2606    30296 2   UserRecipeHistory UserRecipeHistory_userEmail_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserRecipeHistory"
    ADD CONSTRAINT "UserRecipeHistory_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES public.users(email) ON UPDATE CASCADE ON DELETE RESTRICT;
 `   ALTER TABLE ONLY public."UserRecipeHistory" DROP CONSTRAINT "UserRecipeHistory_userEmail_fkey";
       public          postgres    false    282    296    4008                       2606    30341 *   _CategoryToRecipe _CategoryToRecipe_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_CategoryToRecipe"
    ADD CONSTRAINT "_CategoryToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public."_CategoryToRecipe" DROP CONSTRAINT "_CategoryToRecipe_A_fkey";
       public          postgres    false    4028    287    302                       2606    30346 *   _CategoryToRecipe _CategoryToRecipe_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_CategoryToRecipe"
    ADD CONSTRAINT "_CategoryToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public."_CategoryToRecipe" DROP CONSTRAINT "_CategoryToRecipe_B_fkey";
       public          postgres    false    4014    283    302                       2606    30351 &   _CuisineRecipes _CuisineRecipes_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_CuisineRecipes"
    ADD CONSTRAINT "_CuisineRecipes_A_fkey" FOREIGN KEY ("A") REFERENCES public."Cuisine"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."_CuisineRecipes" DROP CONSTRAINT "_CuisineRecipes_A_fkey";
       public          postgres    false    291    303    4041                        2606    30356 &   _CuisineRecipes _CuisineRecipes_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_CuisineRecipes"
    ADD CONSTRAINT "_CuisineRecipes_B_fkey" FOREIGN KEY ("B") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."_CuisineRecipes" DROP CONSTRAINT "_CuisineRecipes_B_fkey";
       public          postgres    false    4014    303    283            !           2606    30361 2   _RecipeFusionCuisines _RecipeFusionCuisines_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_RecipeFusionCuisines"
    ADD CONSTRAINT "_RecipeFusionCuisines_A_fkey" FOREIGN KEY ("A") REFERENCES public."Cuisine"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 `   ALTER TABLE ONLY public."_RecipeFusionCuisines" DROP CONSTRAINT "_RecipeFusionCuisines_A_fkey";
       public          postgres    false    4041    291    304            "           2606    30366 2   _RecipeFusionCuisines _RecipeFusionCuisines_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_RecipeFusionCuisines"
    ADD CONSTRAINT "_RecipeFusionCuisines_B_fkey" FOREIGN KEY ("B") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 `   ALTER TABLE ONLY public."_RecipeFusionCuisines" DROP CONSTRAINT "_RecipeFusionCuisines_B_fkey";
       public          postgres    false    283    304    4014                       2606    30321     _RecipeToTag _RecipeToTag_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_RecipeToTag"
    ADD CONSTRAINT "_RecipeToTag_A_fkey" FOREIGN KEY ("A") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."_RecipeToTag" DROP CONSTRAINT "_RecipeToTag_A_fkey";
       public          postgres    false    4014    283    300                       2606    30326     _RecipeToTag _RecipeToTag_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_RecipeToTag"
    ADD CONSTRAINT "_RecipeToTag_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."_RecipeToTag" DROP CONSTRAINT "_RecipeToTag_B_fkey";
       public          postgres    false    4031    288    300                       2606    30331 "   _SavedRecipes _SavedRecipes_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_SavedRecipes"
    ADD CONSTRAINT "_SavedRecipes_A_fkey" FOREIGN KEY ("A") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public."_SavedRecipes" DROP CONSTRAINT "_SavedRecipes_A_fkey";
       public          postgres    false    301    283    4014                       2606    30336 "   _SavedRecipes _SavedRecipes_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_SavedRecipes"
    ADD CONSTRAINT "_SavedRecipes_B_fkey" FOREIGN KEY ("B") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public."_SavedRecipes" DROP CONSTRAINT "_SavedRecipes_B_fkey";
       public          postgres    false    301    282    4010                       2606    29879    objects objects_bucketId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);
 J   ALTER TABLE ONLY storage.objects DROP CONSTRAINT "objects_bucketId_fkey";
       storage          supabase_storage_admin    false    3987    276    274                       2606    29884 8   s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);
 c   ALTER TABLE ONLY storage.s3_multipart_uploads DROP CONSTRAINT s3_multipart_uploads_bucket_id_fkey;
       storage          supabase_storage_admin    false    277    3987    274                       2606    29889 D   s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);
 o   ALTER TABLE ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey;
       storage          supabase_storage_admin    false    278    3987    274                       2606    29894 D   s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;
 o   ALTER TABLE ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey;
       storage          supabase_storage_admin    false    278    3999    277            �           0    29556    audit_log_entries    ROW SECURITY     =   ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    253            �           0    29562 
   flow_state    ROW SECURITY     6   ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    254            �           0    29567 
   identities    ROW SECURITY     6   ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    255            �           0    29574 	   instances    ROW SECURITY     5   ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    256            �           0    29579    mfa_amr_claims    ROW SECURITY     :   ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    257            �           0    29584    mfa_challenges    ROW SECURITY     :   ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    258            �           0    29589    mfa_factors    ROW SECURITY     7   ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    259            �           0    29594    one_time_tokens    ROW SECURITY     ;   ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    260            �           0    29602    refresh_tokens    ROW SECURITY     :   ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    261            �           0    29608    saml_providers    ROW SECURITY     :   ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    263            �           0    29616    saml_relay_states    ROW SECURITY     =   ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    264            �           0    29622    schema_migrations    ROW SECURITY     =   ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    265            �           0    29625    sessions    ROW SECURITY     4   ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    266            �           0    29630    sso_domains    ROW SECURITY     7   ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    267            �           0    29636    sso_providers    ROW SECURITY     9   ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    268            �           0    29642    users    ROW SECURITY     1   ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;          auth          supabase_auth_admin    false    269            �           0    29657    messages    ROW SECURITY     8   ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;          realtime          supabase_realtime_admin    false    270            �           0    29676    buckets    ROW SECURITY     6   ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;          storage          supabase_storage_admin    false    274            �           0    29685 
   migrations    ROW SECURITY     9   ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;          storage          supabase_storage_admin    false    275            �           0    29689    objects    ROW SECURITY     6   ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;          storage          supabase_storage_admin    false    276            �           0    29699    s3_multipart_uploads    ROW SECURITY     C   ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;          storage          supabase_storage_admin    false    277            �           0    29706    s3_multipart_uploads_parts    ROW SECURITY     I   ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;          storage          supabase_storage_admin    false    278            �           6104    29899    supabase_realtime    PUBLICATION     Z   CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');
 $   DROP PUBLICATION supabase_realtime;
                postgres    false            "
           826    29906     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     �   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;
          auth          supabase_auth_admin    false    12            #
           826    29907     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     �   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;
          auth          supabase_auth_admin    false    12            !
           826    29908    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     �   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;
          auth          supabase_auth_admin    false    12            7
           826    29909     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     |   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;
       
   extensions          supabase_admin    false    23            6
           826    29910     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     |   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;
       
   extensions          supabase_admin    false    23            4
           826    29911    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     y   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;
       
   extensions          supabase_admin    false    23            ;
           826    29912     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;
          graphql          supabase_admin    false    19            :
           826    29913     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;
          graphql          supabase_admin    false    19            9
           826    29914    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;
          graphql          supabase_admin    false    19            -
           826    29915     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;
          graphql_public          supabase_admin    false    18            0
           826    29916     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;
          graphql_public          supabase_admin    false    18            .
           826    29917    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;
          graphql_public          supabase_admin    false    18            '
           826    29207     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     r   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON SEQUENCES TO pgsodium_keyholder;
          pgsodium          supabase_admin    false    15            (
           826    29206    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     o   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON TABLES TO pgsodium_keyholder;
          pgsodium          supabase_admin    false    15            )
           826    29204     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     x   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON SEQUENCES TO pgsodium_keyiduser;
          pgsodium_masks          supabase_admin    false    2            *
           826    29205     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     x   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON FUNCTIONS TO pgsodium_keyiduser;
          pgsodium_masks          supabase_admin    false    2            +
           826    29203    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     u   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON TABLES TO pgsodium_keyiduser;
          pgsodium_masks          supabase_admin    false    2            ,
           826    29918     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;
          public          postgres    false            /
           826    29919     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;
          public          supabase_admin    false            1
           826    29920     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;
          public          postgres    false            2
           826    29921     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;
          public          supabase_admin    false            3
           826    29922    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     y  ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;
          public          postgres    false            5
           826    29923    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;
          public          supabase_admin    false            %
           826    29924     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     �   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;
          realtime          supabase_admin    false    14            &
           826    29925     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     �   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;
          realtime          supabase_admin    false    14            $
           826    29926    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     �   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;
          realtime          supabase_admin    false    14            8
           826    29927     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;
          storage          postgres    false    24            
           826    29928     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;
          storage          postgres    false    24             
           826    29929    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     }  ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;
          storage          postgres    false    24            �           3466    29941    issue_graphql_placeholder    EVENT TRIGGER     �   CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();
 .   DROP EVENT TRIGGER issue_graphql_placeholder;
                supabase_admin    false    543            �           3466    29979    issue_pg_cron_access    EVENT TRIGGER     �   CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();
 )   DROP EVENT TRIGGER issue_pg_cron_access;
                supabase_admin    false    506            �           3466    29940    issue_pg_graphql_access    EVENT TRIGGER     �   CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();
 ,   DROP EVENT TRIGGER issue_pg_graphql_access;
                supabase_admin    false    537            �           3466    29933    issue_pg_net_access    EVENT TRIGGER     �   CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();
 (   DROP EVENT TRIGGER issue_pg_net_access;
                postgres    false    508            �           3466    29942    pgrst_ddl_watch    EVENT TRIGGER     j   CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();
 $   DROP EVENT TRIGGER pgrst_ddl_watch;
                supabase_admin    false    380            �           3466    29943    pgrst_drop_watch    EVENT TRIGGER     e   CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();
 %   DROP EVENT TRIGGER pgrst_drop_watch;
                supabase_admin    false    381            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   L  x�U�ɕ1�{�G�%��?�)Z��}��,�F�����7=��`N�����ML"Zb��)�e�_S<��䋮[N��i�v�Nv8�M�Dn����~�X�[ܡ�F�Ɠ�H���S� �v^Zp�_�W��͆��/*�Z�;rUk��d�9^�æ��#��`���i;/��p�����[�S��5�C�qf�D��͹���Վ�TsF},:�./������7�p�9�U�"QSP�C홆M�D�&hZ��w7�������Î��w^�AŏZu���"�sS��ܻZ��TS|Q��{_;�EЪ<8{>�4�Cծ����������      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   }  x�����:���S��B ��C%*r���B@���
"y�3�ٝ:�t��}���J�%Ơ �TBW,��J��'��S̙'!R
2a��	Yܛ�N���$s�j�CDN���Z��_(QX��n��՝�-���l!�^���M�ww�Ƴ��+?��zClq̛�qY}E���
c�H����GTU�c������n���l�#�GH���+xYa�&lթ���K!�پ�3�����8�WE:�mW�A��.��ý��6.�y���Բ�g���x�%���w����x	���"N�3}.��k_���9�ן��6}�����.�ٿ�g^ߚ����r�~oڴΓ���.�pN�hf�N�cn^\fp(7^Fյ��X��G��6�Pq�*�P�@�<*�!d	E�WY�* �Qk��"�6&Hef�=���_S����j��=ּP+B(sqm�C��c����X�̈,�g�-���Q9���q�5I��1�x�d��GTE��#~�F��I�pD�����/;�X�_�/�C���e��q��!����M���qd{��{!��hk���3�()�C	&��%��6���GP~G�C� Q2�k�����|vF>��r�hrkbK8n���!�Gc���9�8ߋ|.��0���YWZ9i�j�YO�Ч�����瀏���¾WEH��y��&7a����h�Q��S���̹ ��)q!g��ž;�u�ϵ��5�����@�t���&���(����}��>��>�r��fa����r��H �I��n�#�]�=O�% ��*��H�ǧ{ī2a%<�֬��ADc*����������b������)����!V�������i���M-���:���j[P��fx'	>���[�ܝ3%�z�:�3�R�XȖ��ͺ/�*�?U��K�J�(���~ܝ줾��!)7?^��e�����K�b/��;��ۣ��QsV>{��ǳ}X�ƭ'�>W�3|�ע�`_�捫Vn�#\��&��>�HQ^G���{h���o|�;�xIw���iN։�kw�b�KMCm�_G;��[������Ik�r'ʸ;C�u�_l3z�c��Bm2S<:���{��]���?�A���.h%����eI� ������۷:-�      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ƕ.�F?6׌�Δ0K�*RU"��J�du�7�8&�<�P�]����^�ݏ "� "Ume%���q8��<����Hk5EQ�1'��V1���?;RP$��"E*˚��*�]�I�I��@FE 5"$��rY����g:V��z���Z\K�m�Ih�D�Ii-������J,�*�?�#S��H����ڢ�J���t�Tb�-��w�L����gR�1�g7����YRM�jD�)&~Zb�0J>*$Ք�,���iݩu�>��-�8]&h�g(5��/�/(Ò�?����y#�8�=��a��Fni]\&e�gx�ZC������X��$Mj��ᦤ�h���$x�8�y�Sץ�QL
"�;�g��%u��˟5�]{ۓ_ً�t�Ǉ��5n�l����x~� ��LR�f���/�ΈϿs�vX���y�����Ɠk5�o�̰�u�������J��_/���YfO��O��#�+��-ػ�)��,%3��̥3��\���*0��vF5����ܬ;�~���mW�&Zl���
���5I�~�olf��~?�cRu.N�?��E����G�p��M�M���-#�ٳ
�GZf(�r�O������~*��s���r�S�{����E)�=ę1_L�#T���B�[n��Rr*Q�������R;�q-�|���0п���}��`v��ٽA5�ſ�J����N-�u�@����o]ה��� �ܿ�9t���a_�gLZ�H*A�J�]��(�W|'�j���eC_Plw;8mu���說4l��i�I�!�S˗�)����;��Y=�m5��]�D)����I����jOL´�~Nc�
U�~�1.����RӢ,eG��,v�����z��ݎ8�� ��9ĳ�m�_��"ΑCe/�-[��}��$��J'�]Պ��'${�"�0�n�X��n1� nt�*<鯸kk��@T��������A��4C�w7���r}'	�P�:�j�@��4�Tr*������?�����	��T��eҼ�g�X �ޠuby�Z���fM��'����:�D��Br�}7�2�����!���O2�p�ǆv�f�O�����4S�j�K�P?�"Tw����֘�Y����aƎ4;W(H��e���|�G�J/�,�g�/��U���#�P������uf�rT8̿���d����1��� &�޷ܿ��7	��Y�{֬������/�f��l��b��Q�k˽W5Elb|���S&Ř:�d�}ᚒg2��o]���R��b��A���W���r1𽤛|�U��$/��p1ш?k���J1��F���oC�2TGX�\Tfj>��P���2dƟ���0���T&���{���L;��	��YK�0cB����\�t�@ob<��q�iw��}{����g��|-P2�r�N<ny���a9F�ĸaK��|�[|� ��cl|�D[��bfQ��k
�7�}�z+�d�'3`b�%@F���/g���M��Aa�R\yS,*�н}f�q5��:i����-xM�v%�������`�3��l��2���W���OL#F����2c��=.zP����/C�-ߦ���~�/,e,P0E]��������ݮ�$��fz7;=w\U�
DF�˨`�׎��n�>����NR� 7�2���V8���i�O�-��؃��2ʠ�P�.�Sc�?ck���7�d���s�%���Q>j�z���~b�=.�e�3E�*(M1����c
̤�O�#��׏�b_��n3h�é�U����h�ʿp�c;�,:ʣ���E ��i�	�DM���Q���xL��|کa-�F���l�0f�u�]F��ЪP�&XL{x�8��	&"j�7o+��݀�Ԕ��>�l7��h1-j�R������h=��Q V�Qm �Yfuw��5�?h߶i`�^�i���/Yג�v��8�zF���7��#������9X�	6����UKR,{c�pWd�S�1�N88y�Uj.��LQt�1v�G����)���f�{F��d]aZj����6��y]8S����6��2�q�����#�!�|I�0����SC��2p�kʤ�*��mqܗt�o|�L�����'�/1�s�?�j�WJf�K&,��]�o�L��q��������[d0���m�;�`Y剒��.̎���0#]%u�xMB�4#��3	�J�����Or�=z��/ L-�nO���i��3��R }���"ƍ�,���2>XT��<M�[���3�����ѢFltƘ�8G�L%~����gvs��-��y%bR�2c��"��������b�5�.b�g��4��j�]��	l|0��,@ј��_P�>��+W����k���.�9>0�4v����p����g��Ds��P��%}AY.�R}s�N�F��)�'���ݲ�#���;��3���WV�ߦ(�	� �IR.GP�֔��u@��M��a����WvW:vm�;���Sw�p��J���EV��f6�T��$��n�����?����C�q	W�rdf���0�N�#�OD�#zw���W��Ԋb �n�d��q>n���Y$ZÔK�s����.����*�,K	�cN[�Z�t �����+���}�}n��L�-���LCDaG��Z\�����YwdkT �q�l��v\\\|	q˥S�ZT����6���~����C�����u�YJI��1���vG	,��T.��i�L�[���;y����Ńgd���g�]z�In��_'�s�����t�~O����x#YO�;��<4��KtN�5�o��w?l1bGp���'�TL�O�m�n�}�)߯�d�;N����e�DN��)[?�˂1���hp�6�)A�_G�����Y{R�t�}x{�$A�$]�a8Y�ċ:W�m��h<�*s��"�p�Z\⥩�z�b�O��P��^n�W�u:w�c", �M��_�jw�@���Y�݀�N���(�`�'�a�:)�Bv�+���s������t&DNe��dZ�/�$����&i��nl����:d��u\�)�ݎg�����b�8�m�&����B���l��Zq���'D��}������e�B:h�
#:�;��gM"�p�s|��Ni��0����f,A���������, o��^+�eh��gdM�9"�Eh����;WQLe��vg:��E1n[�p��|�:�l�I�����T��\V&u�� ҡ0\�!.�~a��	�!�;&��(�v<�D�D�	�])}��꓂��93�=��q�Ѿϡ��[UG;��be���c���dD��n�1�����j�*0��?�c�d�����<O�9G�'e9:�y�n��&s��v��nO���R��G��0u Ք�m!�׸�?�a����?��� JO���4pZ+�Ë]��0�)��k���V��}�.�ʋ�|q�>��M�[�zπ�0pW�v����d?M�8_,0Tu*"/�r�Ǯ�_����s$��2�cBx�1�0>�S���O��9r/�J������C,rE��v1��$`��e��SK�&&��瀐��P0A��c��@@ }�$����5�
>3�ji{�ڪSP�H�"Ǫp�Y��xlk$�[����������q���0S�6�pI��O��V�Žբ�N��@���Ut��LLKZ{q�����0�O�d]�v/���T���^>���|�0�	mh��j���gƝ�n�������u���2<x ��1��	٥C�����<�g�4��<5WΝ��|���A�ˇ����n��<mUQ$����:bf��M{���-{�!@��5b܁�QL}+ҍ�y���,<�<Œ�-�n��A��>��!��~ʋ��xa��FI>�0Tj��L�b2��ܽv`��aN�_�2�@���ibr�hY�	�iQ�)�V�i�x	���{�n�m�f�\�Թ5F��s��h��zm�
%��L�����T�}b�9(��T�    *]L�%�d)K�IP� ���8���2	�c&4��L g��Q��c<���6K�n�E>�F�����/����Px^x��cJW	�-����|ɖ�_��r/�� },��|3�#[��Z�dx���q�g*�+
4�D��ã�>���e<�Z���ڧ�ͪn|�	˿��#��2�9�f����<�$�+ ��OB�kJ,��5E�B�fB��8sb>�)c���CI�Q��������8&F2q�3��'�y(�Ư���=Hӎ��d� �>UA:lx�`�[�t�UsY�f�Ww�d��*Q`6�?ڮ�xEn,�=,�QHb!��$��mW�
��P��p�� |�ֲ�L��tt�q�������Gn��Q��XP`v�r,=������[oL*i���ʜ�����`#{&L���i6��ڱN����n\�ޠ�/��錄��HԲ&Q�������R��I�Β~��+�PF�)(+����M��<�]�&�D�Y$���ìs<?�&N��h�k�v�<�$O���_p�?%Ԑ�?d��MC���I��ɯ[Q@}b��5u4%L��B�]���N?��f�����P���7����IZ�MX�aK"�t���������9:�1Ѡf���w��WTT�1���w���i���j��LQ��O�.�ܛ�{B��%�4�W�ޓ�tNL��H�&+�CاL�����=zH{�D�g`�:�~���k�p��K�k�׸�m�XگLk����sx���qh�̋�<�Y�'p��Uy�7d�F�'���)U4�
�xq�/ta��$�7U��N�l�8�I�R!e*��ǯK�Y[�8�-�="FQ�Տ��I,խ�F/��@���N�����i�f�`1��j���좰W/��|#a0�:C�bϬ�0�9� ��o��`CQ������U�g�k^t\uP������6�T�^��+
�BH������;���۩��b�6���d�l����MC�4a�rk�ik���T�TJ��`�Vf�ŷ�s�"S�?�-�r�5�,����9.n�W;�9��Ӵ�ه��׌!a�Z����8�M��;(��S���Oܜ*����W3�McF�v[�X��~�B
��e�5�<z���)�����,�k��2�Lʷ\ef�o/*���/'��:Mw�\}U'A����`m��1�4=Y�7^��T�BC�Ҏ	K����'~�s�T�<uƸ�~3!^x`�!��q�fn2þ�-9�Cǭ�95n�u����Qf��,��=��o���$/{��D�p�;���8t�ﾢ""B�c���wQ���x�UfE��s'���9E摚]^?D1��0!�I�}����8��ͻX<D��i�B?�I���6o����#��$iM�bz���L���6�[������ϊ>G6�5J巕"��e��tL��.<^o��4�� �~�g�̟d��j��@�@S��H�8�q$�$�gѐ�2~��@�|B܉��͟$|�ĴFq�s�R�+S��5��i��*�/���~E����̄����',t���?m�?�W6����Q�`EA��3l���\g*3T�`�s:�`��.X/~�5cT�����;ߢ�2fce��d&�i�#���7�*xp��f�h������G�LMJ�5yRx�*դ���:�6[�쒴�x��\w"#.�V��+��X��9yL7P�(r��h�����s0ঈ��z���_�j�\$�U�lL��c�v�_��$��-����5O�s��';}���X���aI����K���'��%�v8���x��Q��!͵!�^��� �#�����߁�GZ�C�=`���O�xl�
�p
J��%W�:x_,l��l��P8M q:\�@n_�<0�R�6u��,�Ul�9"x]�^3m܍Ź�}1��>{����J�8a<�]�eT�TZ�F�o/��sLp�	�4�����ѼgX���vH��q�8{�f^�ʀ$*�kM=E}��� "B��F�	��.��0e���>awvZ���=e��@jM���픿[.�=[��T��)�Ҹ	�[0��¶���W9�SR2PU���s5M�|0�˾e�B�m��pRn+=[��n�hU���P`�W���O���`�uU= Q�^��-��#��]F�lS��P�܃�t9Vq�9��V�a�)�g��$%��W�+/�y��14�Qa>84��e0V��jv���q�������˜Ӫ��<��*��tM7��.xO�� �^�|^F��&!q}'nKﴫ���Ya�e�����	"P����JQ�Z��`���2a�|"p-v��L�����A��0/'q�csm����NL�AgK�ǔ��\Pa�c磖w��F��X/?���&�2�P��zs����{�l��@gҺ�����C�c��F�Y��b|��,a��U���ލ�\A��	���kmT֮����@[7�J�v"m�w�>dπ�YT:U��|�"�0���V�޹�Oz ��~��9TDv�vP^��9;���3�V1��XѰ�Xox�7 �=ʹ�Z<бU�諆z�)�]�[=�3��:vbZN��y_����T�Xa�|��I�����]��c�m���k���K�j�Qr���c7�������@ �H�u����� Mwd���0َ�$��~B".�n��%��E�uW4��,���]��b9�ͱ ���o�%��{j�u�x�t\SJ���`#˖��gl���\f���V�W��L+��2�Ү_`��0M��+����_��ijk:�Q�<?b��c��'Y���Ȉj+�4��xW��0AHJ:�(r7��O�9�(/k��K��HI3��j�c�n�m�� +�8mT'�<�m�ٻ~��y��3����pL���0
]��uHxDgSYMf�7�w��	̳�'�A�[ȥ��t��9k�}�Fq/P�Γv��>�N�s8BVe+-Oݵ�������ƖA
U��Ej6��jԣ%����+�<�,�K[�h�4��:��Dn��
㛨h9�^��Q�`Q(��<%�[��]���7ܨq�B�3m�f���E�0�y׎��2�.�3��v����5D�nѤ��� ��W��op	�՘���E���<�	�$�D��Z�to=ह�|���2�U�)�����Fݴ۵���V���^�4d���s	�:���<��l�E��a_��|�~�<Y�{�k�%��L �N��(�u��h7I�f*f�����x�M-�q�{��"��(7Qm$�}7��aD���h"u��g��\F�fD�3Hi=g�opPf�V)[ϛ��+8�`�*�V�QC��nՠ!�3]��x�TP�o�gwe��w/g�mS�r !zuԤ��W���Y�'�:.@��+$~�u����3�^�X��b�O$a�췎WKTE\ UvLU�VVm�z���	�/s�2�Zv&f���tFe�������:M#o��%���� �!^��ԁJ�t���_�x�3���7P�=�C��ܲͅq���k�̓�r`P%*�s�<P�&�3���RC�z��2��u���=^�VV���#-Fmk1J���LP=�Ո����i�;�����M�!Yƈ��y�c�.|%�4��1���P:�<ȷ�[+�F�K�7/[*(4?����h��`��(rof�E��K�����(���d>*��vT9S�H2�L~�ÁE��J��V4������o����"`[�]?Ě1� ˱�0��|3�i�Xʽ��vp}zl�s]C��¬�~�S�j�]hi$M�D�׷���I�̗~��~9��~a/a��S�x:��+�L��}%uFa�Izl��"�jL��.�"�@�ԩVJ?� sop�b�1o9�L��ڕo,��� ������ުq��+��E�T�����3K�"�[n�ko�9&���pf�M��B�ah��G��c�����D��>-��@lBW�C���ؚo]��ϫZ�-��'��s�sL0��#���iG��_�Y0�@u��~�>�^������<�M    ;��0VS�{#F�T�o��.�Q��b�;���'|R��6�,�8z�Q�N���	����⥨4[;�~Z����3�3���^@�DR�8IW��O��'�mI?֔+y�����S�c�ɦ#�``�F�QR嗼������7�rX�Yܾ��4�x
��1���P���`��+�;(����?��"��sV��L�$�[�����;���xn����tb� fh<��f��3h{j���/��L�2��\E�c�y�o�� �u�4N>�l�k��K�v�����9�(�r�l�kC����S�����*�0ZiV��hܲ���Gz�\�ˈ�0[d�J���Q1������ķ�}�_:�!A����)�hxQ9%����EM-�sx��$Y`1ߘ��)fxJ�ݑ ��T�eZ�vn��Zs�K���3��E[�C�h���4D�;�x�]��&����1���D�<�uM�_�k��Zcd���lKC!�6��`|��t�	&&�^סz�:3T-�%E�Dy�<�S����<^�bs���mr�J�uY A�0���qj����`�U�XGV���!&z�-�7`ݵx��:Ř�����Uzл�mnu� "����]y�JLj|o����wB�� c���q��go�W[d��u���ٻ��m�E<�v�}����X�,�R#����c�&0�{o��G�C�fE� �z�q�l��W�{���p[�Vm�Zs����250��"�ԢKL������>���L����ԋa��}~�n�sL��y�o@����9X�sԸxR�fi3EV�������	��.�ٗ���F%([����f��@�x�B����Zf��f��� ��"��~d�ć��9��*��<��+)^琠��$M�FINE^ �G��
c\�9w�s��k�X���T�s�c4Չr�Q��G�۶I��q����~Ӿ�TDQ`��jȣt����J\�h�yJEo����BmA�0�F���~�V^�vt"��2�{�Uv=RA�y����K�2�c{x��mi��^v}�����·�P�,'�F��������]l0�PQ�u��Zн7�Z�_�L L��kL'�mi��\xw�`�T�*?��ߘ�C���kM���_l#X@�|��0��V�:-�y7� l�z��eTP`jⶮcj�!��L���S� "������L�.d\%�o� ����H<%O�X��d��L@�Ge�)K��ߒW�Sy��^7
Gw���R�K&(\N�3���c�aqo�OnU���	�爠�$����?H_sȻބ����ł��T�۰����ߠl	�K��r�����T@%j�)��;��o� �D�h��J��Z��M(3+R�lF|�w�_B�)J
RԼ���A���hY� ��;g5����P��R�X�T$Uj��h󲶘������%|�=�2��]%Zv��&B~�e����Q��)�qX�(r�K��9&h�ɩ�u'���` ��!���O�\%� �5?�G�W\%�">�̴q.���A���*F�WY�2��@��F5��?6��9�	N���j�9a���̭����(Ƥ����m0�!pN#��م�8J�w�<%\����A^����8xYV��Sts�o�>}��QN.S��9�v�,x�</#�N&���a����Y��� ��"l��_:�vӎ_!���+J'|�~V�����"-n�5�1J'��y��<x���Ȫ�ƲS�� NGMk,�j-��A��F�|�9����=\g`D�t�F�V`c��&�����5*V�8}؞��py�.��UJq'[�����1)f�����@zJ�C�o�߲h1A�2���ˊ\�t�Q-z�xL=��n���iL��A�Ye����$QW���:���V\>��r;t�M��ځ��U��������Ro ����$��~�>�H<TOQ�f�r��W��.`��Ku�&((6�B{��k��t흍1`��t[f��U�N���k�{^+�{1
&�����}��p�c����xt���S�+��{_����PM�Y�7��5oa�kI������	�^��>�"\��͵3>�=�T,q�6��\��j��::�Y�u�#[$��ź�Sy���A;W���!^3K˛4n�n��?��M�Wg�IT\N	t��p�jM�q�?������2,8�ľ?Z����.5���^�3NqiJ���E�b0�0�oķ2EQ��ic�R�71� �Asדn�s�:�dL���0x=��4��[
�H3yf%\�&x�\m���m4�`��9�V�X�$r��>mt=]6��. 3O�L���X��rUk��Y?SK��Sҋ�'�"B��M��P�Ȼ>����(G����݁'����0��M�/���4���U$�o�=0\�dn������}3�n
�6i��ݜ#�I�Ei�L(_��0�g�DAz��S��������k�w쏁w�6U�� ��~�2قֹN���1�������� `p:<d�\���������*մ��O�z !'I��f�T�E��������n��Dvu��JaO�a�9)�ߘd2��o�T����H��j��p�@�\�~ԍ\�W˭i��
�_�4p�ګ/:�'����0��W��H�x���bF������m���El�ٵU���p`�v��u��]��� �%ؚLo#�΃��ٮ.�K�}&�h�m�i;)�uiW{����eJ��ӣ�
�K��0��<�L�~bzy���(3�����h��5�����A��|�lަ? m������0-�{2�n�9,�;/KI)��-�2ě1 �FX��i������.9��ުL�H *�&3K��9���k��탟����4��@�Ϲ�9 �eN�cTr>��5N�2����?��sQ�-��}R(���}//�37�>y�����{��2��j�De���C�2�<u=�mEj�X
3ym��ǀ�ܧ!m��ԅ���a���-��N�Ou�sP5�W��0�җ.Ax�<��͜%������ɴO\P�$@�x�PidR�/5m|�E���wn���Ng;c�w�RF�/e�G��D����9�>w���2��-.�u��H��D9�Adt���B�=GY�:e=t�wI�=�t���B�[�����)��H����1���qu>��J۟��Q�d�P6�Eb�aV:c8;G�m}� ���N1Ց�k'�C|����P�4+5$̜�yxL=K���P|��w���UVY_���s$��m����N�+�(g
�$��d^�	���+�C�	��'N���+\U�Jd������F~eYÞIm���j�/x,]5���bտ�F.���d��?����N��&�aE��)�=�}��K�#�a(`A[Ng�=
%�k�"����$i�kP-��I�Y)��������N�J��7�?��1�_h\F�P^��´��".����h�}�w����0�3��ꆾ;�4"� )�q��Ǒm�T����C�����t���#:��F��m~����@��$A��v<�a4�m┽���]BKƙ=����O4���tqn�y���'��"=4��@����AGfR:�t��b���Z�0�30�'�>/�_(�!�<�|�z��
A�8�FM�k/�l���º� ̔Oט�Ww�JU@<�Y]f	�_����@Lx��]�P�"��W@�(H�³�U��|i $�J<s�����s��su2u,�,��6/�'�8���%�
M|�z���	%Px�Aв!t�m�[-q9����
�҇	+��sh`���̮���'����9/���Ɛ�UCMr����/Xt����7�,�X�i���7�n+_F/^60���
��-<�n����n�J-�B����[��އ��1A �ef{����S��e�;aVdh�䭳��u�����}PLCs�y޴ �� �[����:�sSy&�Ũr�O �gπ��ɩfY���>��t*?�+N ��fTFCG��*���4�d�;����9��1�[Yv�<8��aȢ~�*����9�    ����N��{K���5=�wI��ݼ������ug�_��s(S\dc�^_�@�(�Y�z�,'L��|x��^}M����*���d��V�$4��Z���6Q��wvQ8�3;�O[�OZ_����&k� ��}���T0��i``?����̶(/UU`�^1'V]$t�F\�H˒���a�����1���U��j?G�z�EL+s�Y��3�.`�27	S㱣���q'ݙU��4�0�O�'b�įhĞ���c��h���/��B��`��]%{tMd3�J髴\
�cT��So��	�9���n�p���i�o ��Q\W�Ń�&3}rmΑ�ӪUP�vSI�1NF��<�_KT��5/�����q8n�)���6:%��ᨑ���>Hs�������1�W����
;9�6o���Q����1U�����+�����^��
�W��֛�B��t�-E�Y�Vʶ�XG-_@u'�IG�G1�s�����9�?�Q��l�[i�u/.���.%�m����������A����a�d�ۼ�s 0�hbX
���,/��[��%����b�g��/\z	����r��g�W?�b�:�h-V�`�-�kL}��O�
aGU��5�#�[X�禝��bhn1%�D��Q�2�st1>�ˢT�3�yk+|禸�QA����l��q<cMՖ5�]�sp�M4��љڗ�$�喱��$|}E��D���&�Һk���B�7ga��zY����\�R���V�:c��)D��:�����P�$�N�=y���YZ�\#[gb�����hS�j�v���Tf��tN��:��ם��=h���s��U��l��i\��|Q����������ρ��U����>Z
%�#0@�g�+��O�ns3��k�����sk�S5��ڎ�T>R��1���n�n3#��]����;TО�B�f�����E��'};f������\�*�X���o�[qS��	Q���pli0-s��G�_\�0����f���C����h=u�3ਁ)��������]#|���˟'/��TR�8@��B������b+n�`��^:GD��K��� ���U5$zq����sPa_���Wt�~��n��#�7Â�e��4�n�ZԽ}����6X��]�9,��E�%0�2w�=K�
0���H��yb�9��䆣:����,`��xl�Xv�؞w��5��q��|���x]Sgc�ۇ9۪�]A�9�H�0�I	�n6�Tj@����8�,��Yp뱼$�=�h{�R���P�b�9Ӣ}�!��U���`��2(0=mt�8 ��-�dG/�9�(`l�-L���vx�ے�₿)1r�q�S��7��=7�^μ�	�Ũ� ��Vz��*�Vv�����U��3��{H`*%5���k�u��y�ڳ��9�Hl)�	Z�D�=K�=G��m�(�?���cz�h�xy���b�|�Ks(�ZA#no���Q��]�f�>��0����;�_MϦ�77/F���~�$z$������8�C�#��͢7��/��u�e��!�UA��@ij��Y���19�h���RU�SH�|Q��6#)��PI���/��^�j������\u�pey��~nb�c]��S_����[���_�� ��vtdf��jXaT��\�f�I5����^���Yi���dpVeY2EN�gI�0ق� m�� 1�3���:��&
w�NQ�T��'sxY���V(��٨���m}��⡞���L����]Z�"���Lg�_3�.@�i��j˘3�Z"��/�?��Z3����آ�o�[�7���m��{���`-Y	ͼ>J��!�z&�ڊ9�|��@xW�z�ͼN���)�����
o�ş)c\Ė����L;:Y��k>���,` ����6�!Zf��$���ZOFsą���35�
�;��U�Df���y�`��)I���Wy�9�0՜!$��~̙΁�ZsR�q�A>�L�0`�Ŗ�$�4�f!�``��]��p6�=���e�@Q?�A����P0�&���`3i�\&m�p�F�tP�p�Csߏ�#i����"�?��T��j��Y�����l�1��
?>�1�1[��&W�!�>��'{m��B/:��r���j�lom��e��}LGS5�&�������@erSf J�@�����c���\ ����^B�SLm�g*�ι�F��M;y!�l*+��`v��b�R���x	�LO�ۺ����e0��~���+��	�Ϟ���|�.ٕ.����.�����2	_fg��L��9�9�Y]���<|�q�a@L��K�*��簾�O�Na��kF~&Z�V������x:��✭�w輎	�U֏��p8�A�C�#�_���<�[ώ���
׎��6���q~�o�/I��$��L�$;��]���.ح�>����ȧ7�5&cQ�(6�1�e��$�౴[\j;x�d��U���ӴF��9H�Aw�뵃6��%�C�� �<G�&+	oB6	���|��F,���n{�.Pr��p`�uV����(�V��߲Σ�oUľ��2]~��i�#= 7-˷h����ti��"��)O���ۓ���*4_y�>'�1Jؚ�),�}�&��]D1�	+X��|���]��e�<࠻����Hf��1o��@L��jb�>�����������9/1.��Ss6{�yBҦ�O�~�຀�|T<5��*�T�����]���s0`�L��&+������m�����!c6m9����!������HH1���o���pE1����ٍ���+0����Im}K�ږ���N�����5��k���c�n]<>�O��Zym���:�>�-P��4����>�� ��Y".�߽�<��#�|�[�x<p��[��)����.��v�98U2_�ӨO/��������r/9�����)YW� �N�Iv�ָ��:�Q�~���؉�$kK��[�� �4V��%Hݶ�z��\@�@S^�PY�l�%�Jr�͒�êw/�gb�ACK�.�"v������(ߓ��;���̾��T��a�P������`�{Vt���(1���Qfǒ@����kv�޸X.�$��̫O���`}b�g��z��h��3~'1�q��R�x��]����6ʹ� ���9��0��B�Ċ��7�BHM�܄���sYp��/E�D>V6����匹w�*ٻ���:���}����q�XMV������YR�~b�{��F��G��D�]�	��"���R{�!�5v9�s��=�Ft@�1ǔ�[��`_$�`ZM:��r�7 �ÌC��j�ļ�{�J���N�2�m�6H�/c���k}�g���'��Z����AO��jwXp1j<�Ħс��\��1�@��L)e��Sy�ZJP�iek�����_T	,����ڂ]� �H;N$L����5�-��0�ňƁ�=vi/�B]FY5�^��x���&�L��g:�W�������M$�Bd!�{*|Y�v��_F}����(C����g�m�&4�|'O��1oӹ�.��` �)N�T���(���Оγ� b�7�����9��C��;��Hv{�`fHk6�S�{&D��M�7��e=q��1ʒw7n�C{�C#�'���sd㉝ՑkE��o�������9NV�f��g⑆��S2���dCY�,a=��z&C]z���/PA������ ������������s.`��sʶ�4��ƈ���q^�1�GM5�m`�7��<ʴ]^�]�	�x�����9���,�ũ��������&�FMsU�>^���� ��4mb�&�xͿ�)UrˮfVEA�f��;�u`�|�jvR�����t���9"H�F�p��t1�߿�o�[vd�z�W	=X^�]A��^��(�ݤ����c��mbm�6�������G� ��e���%3�OrW4<��#4|�ۖ��J�X+tk�^�K���8P�$�c	"gN4/\&R����;���!��\�k    �{�]|�'��9����gӽ��0)_��)��=78�r����1��I�S�L��䁴��l�F���L�o��RO�}�ϔ��XT�Gy�
n�-E���a4i�Z��ۥ�#�<���c*��I-;�z4L�"��Z�1�] �+����X����c�f�9 ��22 �__�p�Ya�&٨��=�K�5�]=��R8�"���O��{&��������0�#������ �Ͷ�Ȼg]T��n*#�e��1��_�$�np�1n,x�_�@�wv5&�C�IŞ��u�q�����f2��\�{�rZ�P$d�g���CO�uW�`҆�E-�dA�W�0$����ݛM�*�s��09G�߳K\w��h�o� ��ᜌ�A���V���3�P�yE�1E7��̱�&���z�=#������`[[�6�����s�`H8mߧE/��s$��Ei�����/��s4��d��	���O��sT0!F�)����3���E&���@��f�9���dݜ����IL�k��F��%C��e0�vhc1;%�^�ݕ�B���
2�^u�Q@U)�׎��VJ�ղ��{9!0I�߶���ͮ8F8�)�
��YG^�a�.?l�i��z����[*�ŗo�'���J�ެ���簠��b��Ԏs8P;�`��-�}n���"�J�$-T�ߜ������`[���uf��EK�۴ⲦLݽ��
�Q\$wRS�M�39zYvVo�{w�c��-��=t3�G#Ȕ�Z�>�������2('�roU��C�ۓ���αx����G�9�F�m瓴�{�3Q?�Ồ9����[��6�9I�8��zQ��td�]���UU����7@����Ak	&�B _T
{m|	�­;���'h(��J��D3��m[����8����{7UU�=�6�`���2�ȏAy��pz�Hq&Z�����&��g���ߙmsL"�3�g-U��H�`c/�k�I�C.���B\F�KMw��!�s0p����4�{.�Az˖>�y�FO�h�|�P�|��$���T��S�	��2���״��ih,5�S��_�C��'K
F.�B�MI�F��ZJ�;��E�v�d <_F�g��Y*H.��C����_̀8G���1�1V^V>^ ��kj�XM���p�Ş��B�j���+7�����w��p3���"[���ڵ9�n��/���q1�q[�@Q���T2��LS	G�W���[��?��spX��V,\�����7�dԄ�*+�桀�E��9��JE�<}���H�����x��/�����$`��'����l���L�	A�گ�$�ǐ2�,n:�+%��$����Gفxi�����v�
��j��C/"�2$8h�tbg,�\�=��&"�ph�YI�m�����*mm�sZ��1%1�i�}L������:*� ��_I�y@�B��/�IĄ|��簢�b��䠝�f�L�ˀb̠���L�����SUD3:+���L��Θ���\���?Z����v= ��*j(��x&�\K�����v�\�/�/�f� (�3m��Fꁘh.�6hγjۼji\�ꖠ��Yǀ� 3��e��H\%�
��kUI�=m��&��MN�t�E�ez��MC���hM�!�g~�sTQy�:EҙTbw���d�tb��Z���J�^[�ƞ��g8vVVL.��Dc)�m�b,m��	��!wN��p-3-F	��?��|��Z���~����|���sj��Hi�75��"���G���-�g��e����tN�U�]���F�]�>����|'4��Rf�"֢��y�D���)���Ouk:�0�[���d���)�5�:�Tb���3�ho�9�){��������b,HNȧ�m��(��piϻ�?X<۫$�3���kZ����-;�~�5�]�kd���=:�Li;s5k��G����@yn�D�V�JP��u�?��y.�Y�|w֫l3�z�hI�T�������nҴ1���Q�Q$)��48!��1!-J�|�I�xNZ��ʡ>=���=��B3���О��0|Ly>�]���L��u��9h�
�g��+����T߫)��v�.�+��8l&3>Ԡ���/��!��`��2	��"b�㕨X#"�~Y�sS�|��۱x�U�{��oX5����-�úB�^���0S.#�o5?�zg�-x.��n�sL�ߪ�e_�Zl�{,3.Ê����Y^k�����e`bh'n�z�vQe�_�6�a�	���늖dL% ��%X�yp�G
�с�-E-V�i�̹̈|��m+��ǜ��z�~>���`v�6UqW;������צI36=��8G�S:kjۺ��n���(�C#w�(���${om�gl�ġk�~�Y��~��e]���{��ex��%5o<�>~S�:\.�|�P����7"���2�}M=��1dT�۲7�+��}�$@��F6XE<}�G���b�s`����{d�]�}(�	�96�1H������` @��j��ԙ�ȑ�2�Mb�c��9���қ}������8��ML���f�ipsLq�b5�(,j��=�#[�O$w�9��ә�	��n]�A��M�ӤK[���<�P����e��;-#|V,�a��n�Ō�c�:bpn��d��M���(�k=g���R׫��l��dK�������H)����]J?h�p�	��p(g7����6�7�\]�;Ū��=^v�N����a��M�|h���ByY�i�𛫪�z�93�����~�7A�sLPm��{���,�����;J���yO��3I��=�稢̮H�i�B&�IÃX�:�=�y����%1Ǯ��_�����x.F�5�K��[��R1	ο�[�I~d4qH��;,	Oj�خ����K��%^ �c��6)˟�&���/S���yh�a�_)
����;����.�Q~eP�L�^�	C/2��V�9��9f�idY����s\�4Z���m���d���"{c>�[���G��5�Wa���t�'�w� %�俁�Ʋ��$P��\ ��¤�׏�,�st�͵��M�7�S;��P���_�s慦��%��K��#�;� �;�=[��r�sl1���ӱ����7x������2o	}mz��؎����>/�cU ��2o��.�<'�sz�~���&srҵ�ķ���@��I⣸}�8���&�@O��2�J�����n���8���f˽�Q&�UO/[��]���1˕�@�A�x�c|l.3������,a�������5��q3��=��l����v���/3�� ��Iqפ�.��w�������uJ �K'ȋ�6�c�"��4A��z$s֍A���(C%����>f�����!��>c#3���n�=LsNye�)���6�i��n_P؍@偝�
?Nb�H��	���~b<n)�kA޶W���QM��^��@#`G���1i��Y΁@h:;��0�6}Ἆ�q>�⩽���:�\<��8/��1��0 v���P*n�ؔ=q�NiC�>��g�*s��ks�H�4^ڒ�_[
�v8UP�M�U��ox��@?�-�׊���Z�y�K�t��PErFږ�^�t�(hqt��L釞�(���M[��9H9��������s`�]<�����X4��v5�����ֻ����OH�O�_˲W`�Ӳg��L���;�u�A��CZQ���	WzOH����CRC�a�Oo=z����91:gR��*�k��y0�8&�:�^��=��]�ȅbOw��#|ci�x���4FFhIOu�M�F}3uw:�ɀg��[Չ����;��*)=��ҟQ|^
�vި��zIDϘ]ǥsZ�\i��
5�{>��ͧ~�U�ÂUUT��$t�eh�ΟxKAdD�Zy�
�I���5]��Ϻ�C�i���Q|H��9���r�ϱARҩ<,���9"��!�Eq].�La�/��#�;���[��S�Ri��ź�J��ܓ�ƴ�D�� �I�_mlE��cæW���֒��ţi;G�ɳ(�9$�ڼ`,�p�_�L��     �V̥9�ӽO�Vד�q��Bd�N��`�]m����>��hn5Lw����}<�Z�[U�_��fO���v7i��cl;.{��¿i*S[���������󾈝~ *��P�&�{��a�F��R嘶� ,�*%ё��Q	�ޯxl,~&F.���y����E��8�Q��d�����O�U�b�D�$g l�&"^�◺+6�֒Wo\G"%W�����vh�/1��>��qN �KaEs���f20nyW����7�$�㠴��q�H��9G�2����AA�[o���8�O��d�sH1<{N�bji�Mpk^��ך�}��94�A4�UxǾ�/��/�i��ߖylb��M�`���y:��NO��/��Z($Qi���ڝ��h׋�+J���
�r��2f�e"0��BG��dH��?]l��(HT)�7���A�=�<Ɓ��8�H�n`�e\�#�H�Zk���
�[Ѣ!ߧ�(E�"�jq���A��h��G%BtD��B(�Uw��t���������5�Đ���!�<��y�z�nl�R7K[j�PQ�I~�u�IC�u(�TUk����?�׮�>����A�-����ϖ��]���"MX!W_tyE�ʨ��m�Q�/Ή�z��2���(��n��Q&��we�[+��ν�D�ۗV�0̶�$gdX�qc���uDsi8Z5 eo�܇��<��Ϟ}ING9#�
��'bg�.�d�0I0�1ͣ%�"��~�PF(@^L#�E��2��1�q�9	�	F$n:�z�t-K��7�������D�8#�zO����^:_��<�vy߉sR�Vۑ��?����m����oL��1W�g?N���H�+bJ�����c[���ظ�0�i�+��8�~du��nL�hW�;T�����I��M='To��1%ʥ.�
{ҙ� �f��Q*��O87��[����Kp\�
br�·�{M��BA� �7���,�Y����v%˒�u}Em&#���H�fh2CM�Bo0�H 1㇬��?�̛(�BY�W����E����N�Fm��/���Lt���#���|D{�9�\�)ᅁB$��R�ޖ丿��ț�֋D�)�.F����:Δye��?]�.FQ�q�b����	m�ZY5!N��!A�ĩG��vgB k��W��9�{���`��Q�M��79˶X8L �w��R�	�:K�D�ֿ��+�]�*+��v�+&D�8x���s4��%0)�>���8���un�Ǣ�9o��-��q��V�������ر�?\�(ceC+�Ju�;�����
X��n�<�?�>U��#J%0nG�Ԩ�KB%s��̹HD�.ބy_J��Wl������vdug�i�9I�����9~�3�s' ��~��C뮟u{�-�.+
.=W�_��+��54	��Xʾ�љl�Z5|�/���%�q^���RW-X���1�669?o��S���<�u�W��Y�Y���S��ɻ�����@�}�W�|�K���9�3�xx��yQX�"�)�)	���ɭ�ol#S&/�m���k��0W�$�R��v�������<p���kih� ��S�
޷�@��Y���<5��L5�7L�U�N�:'��o��1��:L�*qUr��U68�����@�ξ^rA���%��<�e4EI'A���t_���DzT[fk�Z;���pl�����C��gC癗K��x�l��MF��ʘ8���̜�d=A��p_"xɼ��6�n��{%��<��#��/E��%�4*�&+k;���9���1�D1W2���)�啢T��"k����������CA�j��̀��%!��P�W��䳱]T�UQ�I��2���i��x^�ņ^>.���*:B�m�(�z�F���^ÁPHP+I���WQ�073��L�.������{9L�3�C-�SG~l1*��]݌�P��&����dt!��߾�|��]�H.�P6ȓx3����:�[H�Ъj.
p�����R,� @,�7�"-��gU~��GŹ���S��a�71+���xL�?�#�m1oTG��E�aB�E4f	���s$WL`��*Qﲹvx4�O=�*�x˗?_C�H0U�p�;3�(��+��?�M%�t֨ ��5a���&D���p��i�x5��qzp�������Ipc�z[��gso�B��Mh0�8}����:�h�s}��f�n�{��p/�H��=̋A���;X����\����}���WZ��,ʬ�O��ՂHp�\m:��l���>�ͨ��\�1����n�c_&k��ä��M�������Ժ"^�4�p�'� �;&}8i�Vt��~�/��>�L��3�焨��R�CO�+��ݎň=B�]K����J����<,C��|ψ�e���RI�#���&��W�Gy����>.  |�V��M��y_>]C匷�QJ��μC�$�x΅_����*��Vfu��p�=UǠ���*�;.C���ឮ-A�`���%��w�K��`�f���I��l��ɋ��kYD�!u�(�3��§�Ֆ�_c�nse[M�g�j>�;�q�S0���T+(�C�
��A���lL�nq�yi�盢|�]7Gx�R�t�v�{
"Ewz{k�f�[����ޏ��*�v�K%k�	��"�QN��m뙙=��a��8b� �� �HI��D�}�)�~��
�H��׌s#��$-�I[bܿ��Ow=f��O�18̀oL�)�;��H4��T!E=���̍�PU�1m����L��$ د�#9!PI��j������Fs,�cO�[L�?��Ə�#nO��q@Y�Ӿ���{�I���e=*��9�91��R�@?)��va^�0is��cy��f��Q�7q��UE1�6,r���s�aҳ.��W]�w��5q]ײ���K�0�B�:��w
F��Z~6����E��U�����1-Z7���S�z�h��f���(�-՘Չ=;�P����I�r4bG\�P��m�]�r��¾^��4�;-<(l��]ص���fM�-�+��&���b��M䀇zZ�r??������{U���(�׮V���W|�7�-O�5��N\)��|�����ǁ�?�P�Dw��fSO�����L��7�X��'����p@A��(ƶ(��	��bTb���V���B�7��' �w���6h����f���f�,;lY�;r��}!�J �`��!�;l��p���^:�Ǫ�J�B���8ЀxJ�ɨ�p	��qp�I�l�-��D�ꭏ=~K@�:y��/ľ<8��ԚH��m�fW��O)��٦
Cҍܻ'w����-����&p�8u��Ȏo���-���V`+�c�[��9H뿃�l`��(�gW,�������0��MM��oH���o?����n���X�_�GB����əOr��}��S\�����3�x�/8�6�?_��>A��_2����	�J�^s�MN%T	Mj�sڞ��@�w��l�q5-��m��=�]�c�cCt�!�9�b#�J?,����A�"hI8� ������a[x㉙fc��(P�j�;L+7�P�r�h}<�7 ��6X�P<g��`��N_��\Y�)�S�߆�]Â'S�Ĵ]�~�I<��-qN(1f�	^,��*��Ј�z$�YE��F�n)��ǥ���t8;�V_���2;��%�%۔���k,�14��5G=HS����(�/7�\+�I�j���4��v�`ɋ5��U]Y���#-H��ƫ
}� �m<U�0�;I��E����_e=/�`���c�H��d�
��̷�[�p���0��P~7�'z�Z�r٧u�5*����,4P�����`��u<�����O�T��T{P8�e���0vc���t���0ٱ��.�'o��8` ��0L��zV|"LT�Y?��25:3��������{������$��uELx
:��Pb4LNr�"���=9�c�Av?���a�y��p3>8��t���������i�"��~n
 iyJ]Ji�Ε    ��֓�#	Q��5?P�x��]��?l�*�[	mм�]�uR��"���+z��ֱ�s�0�-|�5б*o<����K ���3�t��?�O�3M�r�*��خ�'m��C�#tդ�W� ��QRR���h�7"d4��)PhQ�j��,9�k&���3pБ䢸��q�/�0h>*�ALm�>.G�ri����_f츮�$��.U�� 3f�c�Ar_J�-w���>��[֦�Cٖ�6s�\L��M]cs#�3tպ�o���/2Wr�p�s���X4��b:^7{���C��g�W�tJ�s����H6���jG��;�/�PQ�%��?�ltǼ�-�8�)�3��Rϖ(Y��%$9��KFcߦ� XNqR��_ު�Q�Y�I^5��U��z��Q�+�6V��GemV�A�l��1��}~��Z�㠌�yښ��ݬ'%,��e~j�U1DUi��J)5�[Tl�F�<L9�Qʿ����v�z>������cT$�$
?�t��^Eis��G�%��Tq�il(rп�9��UG�Ok]��{�?g �k[vU9��X����c����x�9��+��v#F�I�}4�3�}�J��">G<��)�iM��|����'t����k�Z�T�P��yZG�(��ͲM�i/�(��ǐ��y���vDi���k�:Y��\�CwI���D��'����F8;Ũ33�DB�RA�Tq~�R�1�����ye��s}�Z��x�	��א�:��WH�y����8���]H�?nڰ%'m�jq����;�����F�>�e�k[�s;ٰd&���}=%�(brc��8��"#/������x|��if��L_nT	��0?���wU�W��8���P����kdp��$[�LB�U">�� "O������9��m��{qL�~���m)��@����Bݩ^vZ�P@E/�Ҧ�KB�}�O��Or:����,�:�9u�}��!o� �LL�ƥ���iOBnڼ�y��Dr�BtDM�s�g�]C�����՗�~���;	�EIj_r8�׵�uA�R%~_�u�:s��#�����#SP"�ҕu��,s♾����w��)Arxn�Ώ�k0Ȋ�7E���1.�F���)	,saV�b���zV�@���1�O��zK�H�[�7{i��jd��xj�k9�����UX�&2�Q��0kd������Q����ք?�ELw��RYFu�lC87���!m��'��7M�Ef��n�e��q�0����TA�X��L�Y��ec�5K5��2��8
��}(����
���]ñ"za�1w��7.xT�*C�
��.��d��f�� ����,~,���}��S��e��� �	)S7���웖5����[�X��
��c�z�5���l5��#����dK�Ix�o���}��o�G��|�v� 7d�.�b�.��u���Ǽ�p���qNcE�7���j<�|^����D(/o���Cj"���B}�ezZ8��Q���1����$�w�ˌ����2-ч��l�9�s��Y�� nb��N{Q�S�
�Iԕ���XI��	#)��Z삝H�d��y4�g[.��މ���gr�A;+��e���@�&�d���}�}U��q�B�(�7��Ůx ��l�&k���X����Q��,�T~�,Z��kD�ZK��2��-� �N�h���.մ�S�0���e�4I��o#BJ&O�6�m�r��ژY0�&�[r���̖�xv�
!U�N��ϔ�^#B!�Q�%Z"�L�l�3Y�,�z�Z��R�	�q<�:�n6���]dV�������8����V_r|&M�x��ws�_?ۚ�ɺ�Ǵ0�I�1׻>���,62�tԟ\��ʪ)G�~#�q��Ĭ�������^܌����BC�,���i�*�����0�i)�h�L��i��7�a���&�4�p�(�P���y���Uk>�	�^,�<ؖ�BdQM������<��-��<�t���ΐ����v0}徱ݦ%�f�=vC�Z�h�JKG	( 9/��$d�J�E�9��)��N�k,�mW4K���e�o� �p4	7W���%�t�o���Fg��R�9�T|�z�ELn�`i��� '��
�`j$WlUu����,�&�-���
b�v#���^�HW-=��6���[�c�g3�<����|��y͒��颯W�f��]�[X�;8lt����i�0!Q��Vb�>7�0V�</�xx���+�C][D�ɕ�X�5�3�>(̪���ۯ�����Ͳ��-X�(S�i��$�9�����%�*BIr9�g��W�U�hH�f�4���@��VG�b��_��]�@.�.%����A�r9H$�:��6F�*�5>��VG�Y���C�Q%gT�7D��������W?/��N����X�]�0	�G�@S����p@-m�N�q-}[�ka��}�Wm<����qa�+�5���>�'����@ �Q��+�b�	�;���RO]90��g<,�]�2R�{Z���v�>r�.$pk��$U^�����VwA�HL�<Uɶ>j�Ws<�բl�2]���(��V�.	� rmh�R���)گ�kg��6�������~m�=���v���N��<�7"��>,�0��mh����R���=��}����
������3���JK)q��e��A�$MWj�%�/�Hx��Й���t?�����¾�ď2��Mp�z�_���!.�>4x��x�����d�nld^2�2����N��β��N�`��>���J�s�N�Ȳ�ȷ:I�om�?VbU�V����1�����f8��LK�ͺ���rP��zڪ����t��V�k�����Y`�Nڴ����K����)�Ɛ^�z��i�7}2%n�[WΔ���z��n���`�J%.�,J�rp����50�Tt���tU��%�/je���v��ky�YbJj��/����8�B�5�����֍'�g�N.��x�~��?���A�X���@O�O�2Y�?�dϙ2�(֋���2xD�qS�
�ɖϿ�<��n�E>v�H@�R��&���52�B/I�J	��QI�Hq0Xɤ
IN�
��� ��>2���%p�q9�P�L��swf�\��ϧ�E��qr���A�;�box��@�|QVX�%�<�Yy��"��{۵��n���żk�IJ3Ma�)��hqٺ���^��Z�x�e#n,&qUUM�hO�,99Hp����=��g���j4�	�m�ý9����U��9��oQǶ�e3����6â�DT�ڔ��J�'���w��vf��U�4�Am�
9���~�j*	qO< �9QU���ƝXO�����<_[$J�j�63�:	�nH~@z�%�`\o��r����:}�Z�"K�$�*�O:��]�>C�f���if8�w6؞aۺ�'������C�N��M�8��)(75����q CZV�Z]/��5��@b���4�҄�a��sV4yJ"�fYS�����X���uq�G�4-�ƆZjW�.>�w.CK85b����"h���`�2�X�flbS�ŧ�I;h��a?=�&��<ߧE�M�U�#n�����2�=ϯ�7��շ����Gt�B��5�=�4�jv��j��L���
�5���	��V����?�-��ɫ���9��{�L����S$p��}W����~����)��V��`�1@���])�զ����ei'�yPp��[�ڎ���R��nӠ�*�	�����u�����_�}[�J���;6p��|����%��64'�Ͳ���b�7(�}I�&G�E/(�ƭ(�bb�oЈkd��*�dߗ�M%��î�!��;�f(a�]0�`6�Ԩ��(H����\y5�d��06�"�{��6#2Q��13�;k�|/3�N'Η�u��R��gK#;�h�>��&8i��i�SYf���Gk������p`���U]�4s����e̚ܲ9ŉ��A�%�J�t���gڬ��p�f�p$8 �  ��w�Z8.�o������4#���s�q�����ܥ�a٤X�a%~M)TS��Y+l���kfC>kY�+Kg2a��wBa3 K`q��"�:ֱ'� ��h���p@AB(A�{�uNP�� ���?J$��!˞oR�س�#����TJ�
?�͚+�|��H��[	��+Brm
J"E!f�8N���:�D���\<����v��V]}��)q��b��+�!��_o=X:�'���8��Yh��ڜ�gL�{�V����Q�Ǽ@�YUϡ�{`LG[�"Z�Ë%o��a�d9n4(�Z:�_��$-��e����VD��
{)4r@��YQQ��9��,�i.[F�F��(A�DYa�A?���&�u\�M�?�9� Y�J?ÓT?���d�A#EX���2��`��^�%Ց�ɏY�g�ھ����� �p5����� �3S��dq|;�R������ާ�t�I�Y'!^ZS�������7��6%���<�m=���te�M��T |�W5�y�%�n���n��c��Ͳ�r~�����4F�vw��l�nog�Ͳ������Z��F�^ʾL����B�G�n<�/���z�+�� >z���h���(#��،\�.��}�9�) ����tGM�Qm�̪�ۇ�Ҽātf�f�.a���������\Y��M1�7G���s��@�8�س$�����{Ū�?Hq�����ʮ�t=	�IF_�uPcU��zzZֺ��w���LJ���)A���`�!V�h~�ҥ4�M�/	3W[�8��&�U������_��k8���8cc�0<�Z�:�7���������(~�q���B���2�w.c�q�@� kݑC��%!��N��ᇟ�58K/���ũ�W����Eކe{g�.��x|�H]#���r�NzK{N��o�����C&�;��rT�V�,��Q�Rؾ<2�z�i���?@��5}��W�)�L�߯~���טe�ߥ�sZ6\_�q���Cʢj}O.-����?Ӑ\H��!����V�\��J�|�������r-��6�`���@��[DB���֯1Ig��8V��ޥ���_J ������nP�}���%&���1m\*����V	�T,N')ﱻCd��JR�!����a��P�v��<�����;�Fn2jJ�(Ƒ��u������q�MB��#L;�U�A�7��9�Y��o�Xɏ&h����lf&�L�^~Cݵ{p�)��qD�� {I^FyטLw���J�����	L�4	&h��id���H�La���W{j��l��.?�TS���(p�8Ճ��� �������1Md��nlkas�ⅾ5;P��@5�V�Io̎�S�ʐ��H=-Uͩl���
�jׅC3�[��m9�
ʌ�Q�s���!f�ާK �ͯ̆��j0��	����a�� 1�b4�d�d��q��A�RL�Vr�$�r�?����~����p�      �      x������H�&����u��H�o�UW�tu��T��l+�w�č�W���^�L[mUo2O�sqw��� ��4��F���?������ݴ˲�{�n��l�;'}��~��$t�Uy�U[������Z}�����ו[�,-�Uۗ+Ͻ�E�j�0l�U��ɪrk?�â��U���7_[̦�b'����I�������6o��E��]Z��Mʺ��$Vi�rW����M�j�څ����~.s�""����k7��6��h�'gՆnS�e�jܬ�o�a�v9�A燕[|[���-��ݕW��zU����S�?��~���x�5}�I����ze��7�*O���UW�i&H���5e��#�1��(�h���5�᛫�.sZjͿ�~\��������������;���?�/�qxڇ�}��l�U��E���ua�~��R�U�zY�gWf)JG�t�p2��������C7X῅ҙ����eI�jB����?\�11~���
���4��u�g�BDp�6-\)|
lc�oԡ��DӚ.>q��w �X���ΣI�.V<��o���u�T��K��/����ܺ~s����Y���q�{]�H�z��*��j���
�i���+�G���Q���k���ܥ~��}��)�[g���V�N3�]��z��_VUX�+^��v�����A L]炳�ˇ��w�d�M�L	�٤����;�-	�N�*����:��4���B7_|~��aW:?x۽�4�	�u����]z�[ǰD�g�V���#G�m+~����
�+Y��Ƿ�_ܦqc>�0�{�t�R��������o�� �V�[_��e-�g�>s�ep�:<����
(
s:;�X�}����Jbzal[��ƿ�m��u��b)������ܑ��r�y��v�M��1�B��!��k�C�p&l�t���G�?�ܷ��_�6-7���[� �Y A�?�mWp[qZ�r�qs� A���2��$�?���Us�����jd�:'9�/�%+�ަ:AY�=�.��M��KL+�#��:`��� ܼZ���/A�*�P�|��b���G�)^O��-~x���:��,�*���3i�0��%��T-8��Q�>� �7Ǩ�wh[�KS[��nz���E��k�eP˅QS)�5��ܡ��R�,��_�Ҭ�/-H.�m`j���-����؇<M�j">\����Q�����Л��c(���}ӝ���-u��!K�U}�0�E�^�����D"=0���z@o��I~��F�XCP�����-T~�g��W�������n����듥"�+O��1pƔp �]�l�'�g�<��@��i"�=i��L_M�+s�'mo?H���n��t P���b�ے���*��t�W?Kkz��`��S�/�$�Ǩ���o�ŧ@�[v�$�	n�
� �ׄ�`ު.��lS��S�;\J�����S�ۍB�O��B_�М��UF��O$�����hՑ��j�m���'r8N����/���6tW� �-kq���폊��r:o��+K��ې^�a��o@M�t�i�*@�?�Qf)8 �P��J��N������|�H��_J��6��j]���P|i�"A�?O*�H6�����@35آ�@@1�F���.1qO�?)�y���h"�e�G{w;�A/�a�IFV=�q�3tk]=tȼ_ڶ�xn�_����	��6���ږx��7�$�N���y{�� �$9Q囮=� ��Uɳ�Sx2I�����>8�/��Pп�]�������a^6��~Y^��q��L�q�x:��P���%�	r�4��|�55S��}�h$d�z4ɚ2����I�?}�T�h��/^���� ��ƻ�K?��,;���Hw����6����u��F�8o��Ȗ�7ĉY�7ҝ4��l�}E���X�5��ޢ�\��Qo
��ښ�E�>��n1=�{ۡb��|���EQ��eI6eVCۡO �Mm�]1�Wx*Q�(�7%�p6��B E�f�!�kB|Qd��_�Y&{�/����AX_������ߒ(
E�HJ4ZhC�4�8b=�N0��?Ӟ a�*	�U�����?�Ì�j����օ[��̚jȽ{��RX�Y�J��YR����%/�� Z��1�F��t1��1�g����F��ɱ/ܷ�۟椵4�G'N�����?��m����G
��<�X	4��Y�,,z2�P����q�1:(͊���CSZ���_�G~�V!:?g�%�H�S��#`�7G��Hr;�Y�B��e��Vu58L �4{����p}�h�����k��>�Rf��u�3�]�
�������2�l���V`_�W��e���O�	e	���?�|��B5�uC���O���xt�M��O��E���	�m,�_�}j{����+(Fy�?����u-�j@[夛"m(�n��7���:rG�t��,�2ν�� =Dg���R7����E4�8�������S���~N�VI���.%2"+$/�S�?@��\��*:�ޑ��I���M�&R?x�`g��zl�E-�sC���`9}1�J�Q^c��A���;����:f�)���fe/$���"=�N���e"|�i��۹��t����x�����ǵ+�E��O��7��Z��q�|�t���ꋺ�D>���8�	�4���Oy\P�H,����5�@P�DH�(�@'	a�A�W��BW�L��&�����*^�?�N�X�ج'#�[z��WΖ;�}P�ܾp���C2n`����b���3�; 7@9�c�B������D�(+Q��R�d����*F��!��>�kҹ���(��NW�1/�&nk<�_�p����_���xK���7��	V:GU�]y<%�y�A���������N�	'߽�ŀ�<��'Р-�"�=O��QS)~B���.g��3����f6��W^YͿ��S/e6}��ns�S!���b������X�	��M��{|��Rb�$���~s
�*��[��rֶ��I#'������2�ݿOٚ=�^��u�\n��U��4��7O���6��/w���0��|'�.��ZS���0�AH�B��9>��
�ei���Urn
�d�p�"N�����I���g)Pїe gE�z~l�3!�0�@&<]�R�8�]�[so��f���D�ͭS|�i`�~�'�K�QI|���d����N��ݣ�����H��ih��Q�>*�!uC�s.�����ݺ�k|�dɽO��p[af�?�:D>�A��#�M7��"�����8�`"��h�gOD�f�舱
�1���k,4�y���r��y]��
��^(�.p�e�:��U �e�E���?P'9�i�\��۰�y|Pώ������z� �aԙ�]%�Ǜ W)�C��Gc{di܎A<dq�N`&����?x�]q}�K�L!JQ�)�T�ق��[c^�DX��_��pP ��%T�����Kс��f��9q	�G��C�+���s��T��,<"8i�r�? �n-�F=�����H�,i��O�/&���Ǔ�< |Q|LC3D��#_�����[�) �d�P@���_�9�
�<EE�H�@K>US��	'N�JS3MJ�g�B\tS�f����n�t~��6é8k���mL����,��P�I���[�>	}-VW�L�R��ޝG��P��@�ր��a���aҢ��Djoώ�ɤի޹f�5]*I��Qg��y��>8AL9�p=�*|N��ҥI�[mt<��R�#/c�0���py�1�u-<��D��&�z�{⦠[�T<<�E�^�ڲ��4����Y�Q%��E.S�X�F�Né&�~��%��,��<�>��6������*�>	�M����\ (���k�ͅ��f�c�",�J��~��ȤHJ�Q~n�mЗI��3��@�f� "F�YJH�Db��9�(vr����J�-�dj�/A^�Ŷ4�?��R��ǣ�(�� ��E��O	���SP�o��s��2ϠS'���f�    @�li�Dࡎt�$�J��x#��l{��+�8#uuW���PT&���1��g���5��t���5��)����S�u��B��(�UK�%L�1�6�iS�h�5�8�*�=q��������Ցy�Z�_;������t8�@�'P�L���{ppČ
��dfdR�r#T�9�c*o�9fj�q�7@м^^4�}ck$��Һf��c�d=p#,�6�!���˒k�ɟ��3ʽ%%�����;��Zx���jL\�a�=$��W�����>"'�P��	���k����	!cF�Q|^Ĭ��)dE�5b'��*��'���I��.�E@bx:-.������&��#4��=�CN�9��ͦw4�>#x9�V঴�7G�a�mx��n�0�dj=Nq�k	��`1Y��\�N�i�|���#��B�,No�.�%��R�R�װ�HpD˻
��S�έN؞��VHо��^3=J	��Z��#/| �1��6���(�ÿ��.��܂���t�f�(G4�(ޘB���j����=�jq8yN�8]E�R��c�m�^�����O������x�/d�c�\�`I�xIdZWU�q,�������� �.�r�)>f�(`��I*`���G�ye�(vq�y�,6��Y�����,Q�XS�z(��8��O�4Cb�bM"�xT��{����L-Y��OK�j�o.�-�l��po~� �|Y�͕J""_%�S�@9����Ey�1k0�tsē�۝OǠ��d%��Tn�`�WB�H��8���:�hں�[�oD� �~�,��������_no��"���cr�y�-R��[�2=��6k������<�е�wM�!�A1��
�/������st��q.��8�9G�ѪF$1��GD�
�i�o`FF��Do�� ���8I|�:!%_`�g7qN��l�0;n���0��e�x��&,V��C�6��pb;t�$)��%	�Vy�mP��N̞-��r+k�@�Xt����cPf�~������0(ͷ/��"�e��0�+*���[�=D��.������:2����7^/\JrV�[\���Mi^TK3�0IdE^��9�"(Oަ�2�F���o��*��K�r�&���ix�㔴����Kƺ�����-�[$`��XR� ���ˤ���'�i+�T#�^�ñL&AV�,����[���?�5KJ ~a�p|?�+�:
����"�,8���sPΦ��k�v`3),�\Z�z�3�w�%�%��Q��k��;.�����<�غ�Lz���-�Ϛ_Q�b���� �-�KQ��BB�!K�/� �A�3���v�)�I��8�_|���}5x2�.�XW�m�d׀4�r`�yӗ��9��cqҝ�$>�A
f12S�!;�W$ �)���7��ØAc�sd�"�����x��-�*pL��ֻ=E�4y)-a�"�k�j۳ǵ>T �~2��
�!���B��XD�� �hMaKi!��np��)�A�	�:o�|g�pI�/����ɹ��~@6=,a�5�N`�R�7P͚@Rb$�S,(K�<��B�~�����Au�\	�>��EيA8tܔ�G��@|���U�~Z���Ų�������()��E߮��d2�*�����ȁT�秵��c����́Y	V����A@�ˡ=��}2���~^YW�z�(��-k��R�3�x>{8.�s��*�\���U��b��yS��Q����Id`�e^���a��2���2L�R�B�]��H)�M�\�kg���S�j��������Џ���E����YÂ�0k��w���=i�qy��S��s���]�mkY�Fi�K}����m�����.ze���(����T���'f�
�V+@e�����;��c��u�CfsdL�㐸�=~�͎�4Ou�
Q$!�"\��'%8���+�ge9��6>�]�lv����MCX+��c�O�0��u1�Z��5���>)sU2T}�F:�G�<�,U���i�ۗK1��-�^�g����E*�T��uيh�fi��@60�R��W,� 0 �H"Kȷ�Wr��М�%�V�;��f�Q��"�(�&�j�c�*爠���v����b�2����DӬ	�������>0�L0
� /mA�a��'�U%
D|ki#�g��sC/l)���l�-<P7I�'��N�/b��re��:�6����.Qb�t�S,���<Eu��exM�ӿ.�
%@�pW��4'�^f㈘W�wN�"#��.���d=�5\�' nDoKq2�o�Q��r�:�}��R��1�E2�u���7�.Y$�F׃?Bl��0�y��ʭ�,��a>�[/%�"��u8o��6�P�Yp}�v�J� ��0�We�9Ӷ���FZ\^T嫳���L�@#��vu��]�#��wQ|˨U�d	0
,ct��!��	*ds��X�d|�������&�ݢ��eu�}��2�aG�E�G�H���+%��MtM�,z*iA5�S��5J�s9�Qȿ��X�X����ly�ﶏ$9�I��@Ő�<��+��B�hȁ��T��Py� �lgWW"�Rn*��e�^a�te�ܻ͝S�-t���qo%�~���Xd�~��/j�1�[��=W�k�\��B�O��'DQ�!q���h5D�@cˣ�L��"$TZO��*5^�W�����x7̶a��[z���.������!
p�XbMԼ�ok����Դ��}cR4��]Ӹ�A�>h��
Ƒ���T��C���i��%�a�(�e�
Zڣ~F6�#33�lE��(y�p~�o���ؾ�I�"�R���K7C�a����S	��^jxx�uSM�p�׌j�C���@BL��ޮwX����N���u�5?��=
�|]�
y��n�G�ݨ����,�Za���
�R��]���J~��q=�@�2�=���µP���X�������D
��p�����x�ɟ����ӃA
E����w'PWc��?�XE�+4n��,, ��hサǚ;A�M)�U����.%��|�0�������tT��K��SF��,J�+���H�0�u!%�Uݡp���.�a�T����q*�����[��z�S�N�-br�ڢ.�
k^uD�R��;cE�p2�n���VU��,���e[U@��/X��x�iTonC�~������c)ۡ���
촄9�Y%�����(��m�e-��߀�p F���U�-�$& �T�=1�]����"��]�R��٬�\}��[�-PA"�xz����{���"n�ҺiG	�!�Q~RH�O*ʄ[dC�s�ݾ��"%���],E}85�Aòu��w@	��k�n�@��Ʉ� p(K[u��%��V�jh�Kɣ����l[/j@��F���Ė�X�8-9Q`�����L�˰������z�\�h*����N������tJ�<�׈�#:��;- �hx�h�5��.�F�g)�o��MS��"���|S�D�H䯵F;c	��m �d,�4s]��T>;�t$� ��I%Z�a��V���~>�R��:��W���he!�B��.x���j��]�r4i;���*�F3����\6��v"��V���8�/~��m�=�Ȓ��������I�K�X*@#�Eef��j��.V
��c!!ä`F�2D�'X�ZX��[�u�%�Σ�\o�3����b�5�y�4�]���0�$"��!q{&���L���1˵(�ú��><#6oP���N��]�;����J���`ئ��Y�X��=����W7E!�Ff#^�
!=*r0�:m�iƤ���myy\p��Rm%Е�3��.<zC��`s�G�b�/7� �څ�ۣG�֔�E���`�Aqd���t]� �2i��9�r�w~�t�9Y;��N��/�:#lS�:���&ܯK\��dJ,H+��dn0D��7,>��X�&2W��8�d������ݱ9j^�
sQ�ߔq<,��W������!i��sZ!��ioF    d&Y��+T���Sq��mu����K���)��ł��%�=��:�-�
�+Dt�"^�ɴ\D;}��R(����qӤ �:	#;�NK@��_�+��U7���H1z��jJ�?�D��1RO�#
�e����v/�[������탨N�\ #B�h1~��(Į��؝c���U���Ț�]J&%,�ù��fo�^�ٸ/H������+�/.�;,�tE�%���㈅����$��R�3�Wۺ��{d�����j��_,u�s?l�B� )��`��0���i�r��O57�\]��C�Ш�"L�Ék��'�{5vG��Mq�-�D�A��.�)�OaF���z,��C��P���ٝ�*^��^�!U]oή�?�6�n�����RT�6#@������2� OI��6�Z��c*[B=T93hkԤ�M�n�-�J�����3dan[d���6�,C�������>�I*_B��n�IJ=��\k��J�7j�h,���a��:/�����(���Zp�Bd�vC�9w������.*�,�V���H֎�WE�.����SDx1��ȁ�<���OB���I������tK�t���{�l�x���*��E��ʵ��R5ȯ_ͶE�2��;�^$�"x�g���L1� :�|CD&���5~�%��j�������NG	3����G�%.`!����Kn]%J�������h����n�6D }+�إ`����y�'��3Y�n^�I����V�| |/�Ǻ^����W	�V)���_��ob��x#<�[�R)δa�4u�Et����_�c���]׻ǷS0�54�G�N!!l���@�V�|kXٸZx[�9����L��������a�l�叚P[�r�맄��Pb.C�#�H���h?v�g"�T�Y���t��GXG|Y-�#�ֶgߛ�-�:�Η���������J^��<�<����ҏl���9�����J�G�H�%�C�w?q�H��*�~����.L6�޶ʓ7�斩E7�101YG��/m��:�geB3��(��p��dRWa9\��z�w��("Y��"�E�D#_��^�Tl�ħP�+W���L����_Ø��Rr	�s��}������݉�1�@"{�4��u��H`� 'b���ˏ��fnO;I6�W�{����?�U�%=��Ch'o�a��b:\��
}��(@qv��<)��ǥ{T���t��}�:6���b7v��]x~�]��47�c�n����:A{n���o(�D��ߢ�d�����v	�6�m���)����n_cUn��W������*��Lk��0�*eU�f�ìY������ֹ+̬��EU-�)B0I�"�Xq/HW:���V*.���<k�rU��餃�����b;�8��v�nS�1u�E�l�U�~V7�u�\�G����8I��I��a�p[�@3[��"ǹ��e�tR
F��XF*PØ�4 �,������Y�u �[���1L��^E��/�]� ��W�����H!4ڇ�?� V됣�E��7�$��Nכ�z�9��X��s�&�/غ��x��ןe7�=�Q����5�ނ5�`��f_��P ψ����T)�Q���9�;h�:�쓱���޿�ѠF��2f?�1�� k��ɭ5��#Y�:!
z�>�����aEW�[�4�M�]�A��m��@8�}�4�c��L��LL��f
0]�
��w�k�ώ%	?&���
��:��\�O�[JS���Ǭ�^��t}ʡ�n�=$uh@7x�t:�L���2� '��[v
:�o����؏��<�<�	:�9έN��LNqYט8��\z���@�z54M�뺹�������� ܤ��e4�nC�%*+2�m��'E���-��}5F�5�T�������.��l�m�˧Q��cvȳ����K��==s���w�����W��)z�?[���p��3�:�}�����blD���]�:n��W�$�5�������X����K{<� E�B����L��y�|�?OA�G�u^��p'5>����@�����Q8�89��Xb;�?���L�n4 ��i�k��x�a8w��n��,U
NC[I?���^ҹ�{֡���p_���7p�lY�Tݣ�s-jU�M����k����<i��p�7���u�]���Ƒ�J�mT�k.@Z�������%���k���OE�K!Rȡ-\�Tk��5?cS�_���g��f��@2�.�6���`gG��?���J-6E�E��u�Hk�.b�e<h��vK�O�� Mr�)=M��U��7�Y��|҄}��V��n8��ǛC��G|	��<��S t-�	g�f���9�݆����?|z"�m��2�Z�q2|��v�l��j�'Y�9�u����7M�I���׶��F���1dAjmU_(�J��F��GӃ-�7�S$q��n�˽�E�.�Vr�k�45|9Ұl"��?O�+�N�ae�����O�F��Q.k}v~>e_)����_�JZ���(P�N��o��qHo�9v|Hn@�A�4Y��~uw�[VH��ؔ�ߞ���e�3\�a�ߏ�L��%����(�V+�Ac����0�Sv*�n`k�}�d$���}?� �߹cm��z�S�d,b1#&�E��V/s�cW�F���?�W͹n������I�䦉M�!�u���:+�^s��܆K�!ɓ�V��h�(&'C�m��1C��es�T���:�5�ʟ6��X��2�J���u��H
�Er�=��U��ظQ4
��6���YڑI��j듁>,!�x�i8dvd�e|��d��aeJ�uv��*��z�&u��Q)8�~W�YNl-���<�a�M��{�r�w��1�����ܟ�����޷�qo�iH�IE"�k�I?����~��X����Ǩ��,k�½�'+��"=�̰s�a<�x���1l 6�:2�77K�����e!&���9&"?�sG����>_xe�а��@Yn�S� ~# Qu�'`�q���7W���|�B���1�
�Nǹk�C��$���I�`2)%�킠<_mcш��d��A��2}���'�^H����;M#��Q��C��G)�Iגּ5�RB)��ᮼ^�h�`<P6�%��nBljG�'@*��8�4C�]p����cJ8eL��R#J�G)�O�ӫ0��o������B��-�,q<�Ҿ^��s@��W'@WaLd������.��4�`�Z)%�l�<K`�����A�L���-$�u+�o� K��m�����T(>K�m����ki@ �R�!�(6�;^���[Z�-��Jnen�\�A�(�J�ќ\ү��Ơ�^���<疦0D�¤,��i���,�1_?�xI�c���kS2�r=d;/��.c�������?},6�Q�8GCy�&r�C�9��}��B���SZ��Th�x�z;ܵٸRkN�X@
����[�2�$�����f����ī���P3�m(�ܖ�N�E�mb@=	}:��1����K	'/�]���0�!2��r2��_�9��O��1��8H�(2x����y��=��EF~�;f"uv��6�΅k8|4u����0��l�V�2��r�A��Z|�<�����°�n���j[�/�)�J��ѯe�s���uTY6����3��gI"�����<�gM�x�g��Q�Չ�/�c[�	�#_$���Ҟ !KI�����v�)�VF@"�rYO��3"�T��[�(o�Ww+�^ݻ�~���RH��i��vs�'�1�� G���U��/��kC�c
\/�����^u�WŦ����A��Lݧ	�ꅽ趡Zk���!T�xw�zDa߳[���tŻ�1$��"`���^2��4�R��W�K�[	�� ��̻�J<�}���f��Ժqv3���rd�~���ۓ����V���L�y��e'�̦�_BpS�&��[�_�[�1�F��\T�A��A0'33�!|�O��y�9&]�������2��Ks�(���*= �M\�2�V�;���~sp����!����    �P��0���~!�TJ�ӟ^���ss�����Q�dsJ���kcҲ��v<���GS��'�h]�5�l-�!d���N�}g��y"��DR6�ˏ��p
tK���s �/�{N�~WSoe�	\b��Ġ\�'O�8;PDe�b,���%)ez(R_6�c�z�R�æ	����&Z"�I�k����<F=��^	 x�|&J=��GJ/2[K�D�`��m�V40��K����a`T݈��(�.=EyN�^��Q���A����~����J�V!�+���=����*�* �E�w)ŉn�v�G)N��mzd��n���k*y�D�!��]���A���Q]�dW�%����E�ݪ��2�l�bԫ
��"��:1,���A����u�枀x`�E��e�ث��C �si�q7���$P�%�E��r����{�>�eب�fZK@�`B"��uc��\����{yNJ�N�;C(��D�tFYd�\FP�j��:ZD_��q�"��ȴ�|��RQ�|"2�����������x���~��2I���g~���C0���)�u�4r-�ms�w>O�Л��e�i��5��z�4� ��<ԥ���Mv.����-��7u[��/9���`����`UIe	'免�Z���<Ӱ���H"�]����� �U�Z��X�j�T���-�7�ƾ��R�@�cd\u��Y��$Y��1�I�a~/�����q>u�`���Ԩ�9�Ҋ�����"���%�w�e�H#x�mUm��,���z�F��@��1T��E{Q]���7�� >NL<�%��q"�bF�t�&4}�)���!�"�X��|j�����Q7�y�k��Z�s%�����*���S|��A�H�y�����܉�{��њ�0?�u��¿��l�@c�bAkE�+����C�l���e�1V��]�Ȥ�?
�M��y�ש#�e�Q�OS�y\� ���ruqt6	76{N[�?�F��1=e^��  	�s�F��,ѯ���HL8�78'CZNV�L��G�Pe��i��?�:S%���5��.]�r��׀GUeX!e�2��Q���r�O��j��ŏ��1��#L�:F߰Т?]��W+k8l`Bp��P6d6  *�o�������y{��#�+zn��*yF.�.ѧZB��c��^J!=�,I\��{��C���c<�./���
��5�MkR*/��ݶ�ܞ�����ur�ds�O������b$掇�����LA�� ���}+_3�ܺ����B�:s�*zO�F"`������)�f{�6/vLߊ�	PKW��3|��6��K�n�߫@��n�͑JI�&�Euoƀ�ָ��)v�	�����?���+�O~G�8�t��4�H%��LD����O|�|��U�*_��fN��2t�b�g'�~�g
F�ᦹv&pU#+}�U�}�6'���-l0�8A����@��`��Sʘh�ۧn���d"��OJ��L�g ���'׍Z솤̑u+�����(����̀�OyT�U��sor�֣`�=w.[�5(!����~\uʭܬZ��H��B��5�5�,$FO<q�ɗ�J�#��$�KV��k1�޶'�KNq�`@�O	K�``�����&��m]����BbnAr�>z7�Ge.���(&�+�c�II�$������.��H�9�w[�J�$���0nv]'s1��9H�YSz��^�?֬f�A��ʏ)�Y�Z�
>��a��m�BR�u{��� Bgjm��g#��y���ܞ#���
X[n|]�����i_
�z�6s�M�z{�nҀ�b�2��{m�QH�G�{����<ټz��l]y�`��/���m��K�d����"O�r���>8�@�/�A�ǳpa2>�m��EC����<����M:�"�%��H������}r��#{����ﰀM���W�P�I2`�c�?)e��eB�O����0(o�h�Sr	=˺Pp�~*������ u��J��ɐ��gO�Z4�A.x	]�,Y
V�n��~o,Hѩ�>h�c�<M>G���I����h%�l���;Eͧ���٧B2�<NN�XeZI:�y
��9v%vu���[��_���?�W��E�d���m_��9z)8դ�M�T�б�olz��Y���g��|YzthDֽ?��s�R�
���q
�_�4��
�8���w�SU=�k�0�B��V<����W�dKvU�D��6�/3�#|<1�狹~"��v����o%<S�2�� ks�f�~x��tͽw���xɯڊ)a���>\�ߞ
˺qU����)A.����LY�}6;�ih1W�h��:��{�b�ډb�<��ˈ�Se�_?���fr��H�ݽ�kal�����#'߳44{�HR=.Y��cCMIv����6��<�{֞{�}���N��65��I�_�8QE��?0�B!��e���~�&�t�n��8D�yM�.ڄ���F�'���[����'��@͸����w�dt�^e�N	l�Ω�P�����l7]Q�t�]��)pF�lv�{ڰ�Y�(�Y�P����4ǅB�S7ܒK+V]�u��wO��&<ꝡ3n����Vt4�B�]��Y^-F���l�ߕh �����^���l�}�#���ϐ� �����jZM@@a�?���P6���.H����>�	R�-��/�[z�X�����`�$���ݢ��X�ܚ�9�����#�0<�7#M�7#�/�q��[:��;�J�X�aTI��es4�cs�6q�F"���惔����Pd��>2��:¹�.�Hd=Ì:�-T�P����׊;�u"�����Cؿ�֖�yKE��/��r�~��P[��D���*&��be��-�bgw	O��]0���s@cz��?��M���R�ɱ�e﷎¯(�ŉd�2��a��bo-�6�/�������eY}���"(�Ěf�E.aÓǿ8��%��9t�!�{��i�V~��S�M�&Tl�p������g��$̝į��TNsvZ쏶��~���~!�W�w��tI&]�?J��.Sm���z�IC���1/���@�G���-��7�ן��$�r����d���<�ܕMpD�C6��D5�����{=gN�$h8�\�:?-�af�V��'קPͰ��4{08f)������zk޴~����^���[vI�1�شr�R@��%��ޯ��s.�Q�a�1|1I�%���B�nw��#�D;����+��&��JDy�^�����w�}F����7;ce�c���NG�f~�h�5�u�2��Lff�F�KI#5�v����BLox��1�<7Ҩc�j��kP�M�Iɴ����U|�f�O��	(Q��O��-4�����7��
7[�0e�N�[z���؏����u٫�*����ć��s�!�J�w	!�3WM��p��(�>��S_���+���!��N:�T$�YK;f�%�S�1�k��&�y��ګ/6�a�}�^��u�,/*��Q�������kk�(��4[��&i��*E�t9�t��G�xs��+�����n�ZT�YP̭M��N���S�+/������4�E�E��Y��܋c)U�T��u�+VV�9��/-��k�����;�`wlJ��sҊb�����/�а x�wRi��܌��/{Xaz��Ú�_�|�#���4����t�_g3%ܼ�?�rs4�nJZ�\�X傁e�O�]��;�Ϩ���s���8"���Q[v"�JD���y�bt�R=��6�ϻA12�R�����������'K�kYE)�蝮���� �}P��ɌOs����U�_Ѫ`�$'-u��_[���^���}��	Q�3� �d�DڨELuҚ�czƆB\��tk��<;{us�����8\���1�F�#Zd���E�.Bg�=�v)�# ��ޭc%�v�Z*P�-�-܎�N]N@p���y���1M~�W� ����Ǘ������qa���t��	,Rz76ݏ�v�����/��s�]>ɑ9�I?G��}��Wi��2Xk�&2V��[�hUÝD}�tcr����S{�?�;�_Z��)��-R��h����h�{��ָ^O��    G��ލ���U~�XN�|0c8NK�P�s%����9:���n��O�7�)�Y����0�D_�!f�u�a�rz�Q�	M�Æ_S��m�m��$�FH�GnU{8
L���!���P<�>�|�v:7��(�_.�0�|qZ��=c�r�f$B�r��e,%���M�ev}��\�J�iA��ѥN��T� ��ڝ���)e�:m�BY�%j�?�u	@��nڈh����2�Ӻ�!���^��U0G��i�*��f�W�s0�\�]��i�C<�/B���x�yA� Nt&��a�gA-�kT���`�E����Pv�}��
D��c.|�^�c'T?��y��[x #h���؞�UΣ�2��e);��>m�2K
UK��)��{�~' ��VH	PG޷�h�Q9yA��7�c�7���gY_8Z*��U}�g)���>=���T�G�(1��+�rFos�
�.NUCf]s+|���T��͹<I�yFVZ�,Lŝ%5��R����qq��9�;,��0�k��v���$���m�_ d�D���B�D�>p��l��	��{
)<���^�&��YB�έ���B�_dO��#?)(�1��ô�hܛ{�>� �@4w'h��ٚ�Lɋ�"Z钖�X��L��|ݭ|�"�e@D��`4A���S��k �!�p`"֨���A�}x��b)-�.�6ޞ{Y_K�Z<	-�6ʐ8PM$�)�c��y�Shw�:By_�޽U���\�J�y�r�r-����i��o�&Q,�>#���5������5W�GaZ,����լ����z��ò-RQ[�f�ڃ#c��h���E�q>��t#��)Cw�@�[���v]T���F�Mm�"45O;Wh��Ql4���IXe;j�-��G҂�BQ1�a����-��I�K^�Y�*�����k���n{����aC���7o,Q�U���ټ�S�?�QZ߯4�扡��I�|���l&��b�J��K���A/(y���
ef��f�j����2I~L@�!$c/��]r�.^6I1
,2����"�����s�{�ËQ|'��[de�A	���o�\��ۯ��wSE�� ^� kM�$Cmx���YJ	J�Z��@��0X'j�����&�v�UE�hm�	j�]�{����$
(X�O�B�q�w��N˸~K���Br)cA��, �)�""�qY6!О�zѺ7G)�]Uo�t���I+"��C���[Q�����K�������2r����m�7�r�z�56e)R�}�r��*�i*8��=�����f��E�nS��������vXiR:�[e��#�$�}ic���ϒ�sb4�ܬ����c��=yfBq�����e�$-/I��peӌ���EHS�T(ڙ,��=k��[EK�
��(O���*�� ��qk%��W�g�V�.p{�1Jk�fDd�
�7��7�uU������@pa�k�A4��(Έ��l)ԙD>�f�͑���K�υ/:vIu2ZN%4&�(�PD����U)��^�4�N���Q�g�g�"��G��^-$a��J����QA�r�s����°;���"K��%q �i^���[�~�ZQ���τ�D���v*�����J3��L�W��׭��%�a�ħc�d��7_l�P���ɏO����j��������_^�8���lP����;5UG3�����pog�q��S�hj�3|��f�Z�A*��f����u������fПz�s�Eq���(�����?����T�����LА�U�Ae�M� 
���Ca���S��R:ɞh����w̩����銪ձ`B����>�Eo0���Rՠ�q.�,�{O�q�V�V�s��EZ�Q�)0�"e�y�@L�$�K�s���WSGג�Fr�FW�s�r@�r.�Ղ0�y
�y.)����������f })!d�\��윷�H��D��Lm5G�gc=+�	b��j)��yR�el���y������r�ɡ"�*�H�#Ur�k��$[�c�9o��X�d���ON"��Ñ�I��0Y�|j��LH�q�g~�M��P,��(�~�Ҝ�1]N�} �I+�٪.�s.���[�bkϴbMWG�[�.�h/�C\df%��ᥑȵ\[*{�y��̭K9�ؽ���l&n5j��G���hn�s��e	�[�k;�_K�O]���HX�((���h��j��~KW��ۡ��[�����}�����'�_�2\��)e2b��1kѰ���;��@zm/����E�K�rM<2�VϠ湕
�aci�};�x���Bԩh-���������j|v[j1����MN��0��s=r�����>bmCV���[��,J³�xxM�xY�Nm�i�I���z�&%<rx)=� 9�������L���٦ ���e۴+g���r)��K>v]�u7l �R�:x�Y�^!�h�<��4�"c׏��P\�:���*�K���^�:�8)s~dQ��w�sl�ڋ�6J�p����i��+���܊�!�1�7ǔFk��탚����_@�C��"�Z�ٶ�n�DP�|���6+���a�<]����;�E�${�M��C�\����M��#l�]>BBn�w)�ɛ\%(�r9^�����<�#�t�VR.�x�zl����;�˽��9�'n���T$~)t8M�O��<sS�.���F����!wD�Ua�eMKI ���NY�]
aT4�xो�o#vd�Ą����q����#�f;�����_\�KY���|�Q��!\�J�|���XS]�0y��΅���>�
��_M��<9sM�=ګ�=��`���IS"T$�zקI��٥���ӡ>��D���(����c������_r7�k1?^�V�,�!~��������d��Ѩ����J�-��}=�{[j��!�0n"6���!l��3n��#�����u99q���Vl�Mn��D����O�PAY���4a���E_�}�d��QFJ/��~�q���Rs �x�0�W�j���l���W��c�l��v)�=�dΩ7����V"�Z�x3��[F�E���^|"����7E���e�q/͋�zje�*d��WB��u.��w�Q@D��z�� ucv����>�~u�ݴ�݁�xc�6�O�#�����G/�<dEuI� 䌌iG'�\��"��G�\�to����듮���?����'���l�'z�ɱ��a���"�%[�HxJ-T��f�� ���;'Ty+޾ Gbr+��.7*�
"�&�j�9��E
p�ͭ���qĜj���#(�h�>\�A��(�H}�[̛���]K����!XJ����t*6Gtƞ�zyq�V<�L�US����h"�S-]��f�}2�l�ɧ��/i���㘫"n�¹�4H�0�v.���~��
G���7Ki�ʯ������O���0�	&4^XJ gQ�]��l�B%ȝ4�@-n��[���,�׈��gg�.Goy�m-;�cK~�%&ٱ_�?sH�aD�4шҬU��5Ҽ�
�PƖWm�v�v�Mc�w�,?��!����Zd��BP j:? �QC፡������<�A'c�2Tx���t���rf�{l<X��s�z������I����s(I�cT��v����������d;��>liE�3=��͋{��ZJ@������/*��m��.v}JR�-A���9{��<5�{���s���\�<$�r�G��y��Ѵo��[��]G��uF�,�q
{�����E<��������L���KPt�L��l�n��w�w^�nA-���j=��~yp���. ��79�H�{���ۼ��I������X�w��(§jq���T\�

i_�v���Nߞ(w��^�#"�i�i��A��1}٧�]Ehvc��B��0�Ϯ��u}0��Q���t�U���uW|	�%�B�`�%��%�+�(��)����:
�36�%U��`'�zc�,1��2��].b��ۀ�H��:��z[Jp�#�쿐r{���ﴧ�;V��	MhM���^��2&g    �,%�|ߦ����H(ϧ�%�I��?�u��-�S��T��pSwu&��g@I�Sw;���#t��`"RH�XyٓQ��+�ϛ�iR�NdДr8�K��mP0��i�ɗ��-��r\g������P5�0�&�����ٵ�"vɣ�vEw)w*��"{�j���+�g'F�,��,�����M
��菰(X�Y:O����'c����{������Pw�6�ϭpP�p"r��4�E/c�9����ա�<
���1�¹�]{g�n�~�)�M_Ā�t!)	���W��f)`tW�4�K�X�ё�8����5q���F����+�V�D܊�]R
,���}�vɾ²>U��ߢ�";u3��\䟜��g�cАw�o�'���%�L�.J6ߕ9�y�8d�Ţ,�J,�[`h���I0G;Y2�g�Y`�������)��I������F��܂��H��/�k|X���ss��{�_�9hL��Z}�Bv���<���<N�A�����K�
B�l��Bk��?G�:��Õ������~%���D��K���3[��b{�N8�bC6�h~S����Nԯ]*�#p=5*]�����I�۰�<��b�0Bn�~x�s�Rb�{�evB@��/%�4���s���Qg�3�\o1��!�J!�S�߫�&3r��{8P��m�l��v�W�����|,%����O����>��C�݌f�8#�L,T�a;ڤ$��B@��&	p=f^xr]cG7��d/���z�*3��:���||�5�IK��I�| ��l�
gF��s�X�3�)'#8��۽qQM�}%��q،�̥ZOj
�E��l�Ȃ�šWnZS+��������G���͛"to�l��<����Z�N'��oaY���>��#�W��G��]32��E�%O��TR��z$g2�t�"�� nq��IC\�,��"��pt�'�M��u)�do�(�?�����l���Tf �Z���f�Pm��=�p���R�r{��S��9*���ms�,��o2"��B��M�1������q&��_��'� �+u�o�J�Gy
�����Lͱd�@��>�#�Í��뀣Y�(@�wIwO��IH�񓕔����/�D��'�^�n�8����)oMx��xcWKQ�������:��1��e/W��Ft���bש�	�Zo��	u'���,鏶ee���P"���N��~e��a�Q�QU)��S������հ�. (���[=vNr/Z�R9D���8�E�'�LQ�*o�cIe���C�c��lY֯����A��@)m)�K�&#'z����"� ��){	6KY�!�c�]��jtu|)���� x��y�av#�7�=��������龯�E��C�S�ǬC˖��!���?C��+�6~���5w�z6O�(�#�}a=���6���:�H�f����i�v^H=�[��o���Kw�<Gt0 #{�)�Y�wT>JC�v8����o+�&
�+��%`	=e	���������`<��;#�aQn���SLS��?�ΜN�Q:�alûpQ�Xl�aչ�j�T8�Z�/�bf��eC�ڏ�H�L�S�,u���e�O��<��+�:������`*֫P4��g�Ʊ��e�XH.�2.ǓS;����¿���eג�px�(����y0x��9hl��� ��� j�8��U��l8�n�0֫�5ݘ7a��q������2��Mo�'�=��oG�S<�)O�zN !�y�6�~����EcE��l�Y��V"��xx�6;��5����D:(�Hߛ$�["_����)oƖZTכ휮��/!�q
�w<l���~�;�'�����p�����$�*O�Q��7�A�&vWT,~��z({����5�%�r ITT�i�<�S��e��f�hI��ǖ��%밴n)턛8�ա��������/���tz�[�![X:���D�	]d̂�L�H�|׶ހ������<�\�O��ʹx\]�D����g�`R�}Q�AW��W�#���  �8Z����}�D��� ��DW��%� �54eR6�T��c����{���;�pY�Љ�C��
���]U\1B�4��Ɏ�]j����>	�ɡ(\�bQΘ\��ܔ1�+F�O߄_/�3�d\JE�o�2������r^�3�tS� �l���_"iۨf5ԣ�F��a}�	�����m��uR���c����3B_f��J��A��0�G?�MUfI'�����NK4~/9�<�b��V�U,�>�Iǫ���H�Rl�Y�2���*M�m�f�'���;��0b���yy(��c��E������g�.���P����f�~�b�T�hBe�խ����a��M���jA���-��Gb����?�����:�6Az���̆��i�����1-��:�8��~=���8&�Nip�B'���M��-ކw�l�-�w�$���"A���2�Be~u��L���.0D��YK�f�6T��,�&��Pݽ}$\�g���PƄ����.�J'�o�CM���Xo�=pVc��p4?	\�kG�K��.A^�=��&�>ߧ�JD���G$�J4,�'���O�s4�fΎq]�WO��c�D֐�ψJ�>4�=	�0�Z��	���x585;g�RJڷ����.��:<�*�V'<L�[��=)	RB���R�H��N�֣�Y0.J	�$Cli���՟��u�D������A�?������,�/,��4����澱ib�� 2,�,��=���^��ͭO�6(�}R<���+���B[ ��7�_؇kӔx�"W�	oCol,IK\��U<a��vv�_Ώ�/2T��r��&ƞ��_}��X@�8\��5��	c��3_)�����qx����6c�X����	usj2=}��HE���R�?,�Gb�o��M��Ѣn��aN{����Lg�ZJp�u��ן6@%�zۺ�a�cwI�4E�7I����n=f5ǀ���ʘ��~!�7�Z ���n�פ�i�U���A��.E�����a?��1Gb��X��G9�c�H@�aGe�*ـ'�| ����Hs����ѭ���VUF_���I��\v�䘸�@C������:��t��8ˮFK���u.6��J�i�'b[D��bc�t��U'�K����EbZ/�}YG��7Q�)�Cs�1�Ke�d�6�����
(�@���[%y7K�BY@'�Y��9�A�7	�㪥�i�ڦf,��
����y�KW&�p�.n���i�H���W1�hc��|�T�L�y���
�c����d�#�RJ��2��ҷїA���勾O�	�-�Ƞ�QG�4|)}{�'n�*sl�T�чaK�*_�L��£TtQ2�4j�fW'�����Z�/�<2	0*��~�A�G�iTz��y�Z۞'&� ���5�׷6>P�;��J�Y�ó���������b8���312�t�b��g
բɅ���{	O�����L̉s,�a���L��E��M�����U�.!&vL2s� E�^z~+.R��Ci3K��<�޺D��=@�[^�<�Z��e�S���+T���a�*�-���=�������tťQv�Lyez��Y")��^������H��u��k��;d�t`�������굻 ��#�l�%=T�[H�
tގ_�Uȡg�š���&�����Lm��dT���4 ��v�?�����TŖ�	����q�qFQ�a|Y��b�)]8$�5�!I�>��n6)���l��^�M���ɣ�S"�D�5���90��?���R�����t�Ԋ=$V�B�aG}��7�����VqA��KW�>&�uNgL��C�u��bMB����)�w>?��
n�^�����pzS�����aY��C:b���b5��b	G���u�o��lq���^n�cd�e�s��gk}ѡe�|LQ�^-�g�u��Eۀj�c豫D��Z,�Gwd4i��h	�����d�q"��x��IJ�/2�+�w�^���C�u��ύC�P��$y��l����� ��O��M�{�    Y���e��:G��Έ�ҩ�?���f�&�&���C��m��k�4bT|�pt �%Vk0��̧���]s�Rm֋�7�/�*)�L�J������C��nR���;�z�沨�$7�qG������?v��o/%+��3tΰ��+"�ޛK���(d:�A����z����C�c'��q��8l�B9�T�IF��M��[J7�7���6�uuA����Ui([��*d��:hS��r�o����"9w��1���:}*`���Je�%���qͧ�����ʶ��<Z��UJ��1���V�}2�{�V�����7���H�rz\H��ǡ~���̝�ʝ�h�|:d�l>x�Z%��U|�;8ǘ5HX���b:ɮ)n�}n6���RN��z�P��3_�9��6g�~lC��k)�d��V�F����K�?�FH�����&��ͨ�d@�?|�d�xM����������o�S2�'7�ǣ�y3�����XH&�D�״�Mtǐ�X�#J�4D��%�a�7�_��re���YL!YL�n�Y�K�f�ң�#R�lU��Y���R�L�XY�<�7{g���l��qZ��!�F�O��d���l�e��J�{a��;G0�d��]�m��Wdu�V���`8�?0��S��C��	���g�?��9�S8+*k��N��������O^��F���v!j��`j�Fy�K�rSW޳]������3�B_D��6>H��M�/�c/\J1e�v�v��GY��j��s��Q�!Q�/2X�9<�K�!������Ĉ0���Swc�G�>7rNFV�b��^'���DX�d�a�>/K��S��׹u����Gu�%0{��O멞 �%�HJ�N�~��n�D�|�RZɐ��uv���墹R/�����۠�%���bl�qRO�4��]��}�L2��M��i��ϯ�L�TV\qLA��X)(�����0+�V\�J���1�mx�s��1�I�����`K���Ԕ,Ѐ��V;��t��Y֍�ror�;u�+������d:��z虅�r� =�At~.N>�ϑ[2�1�UL���Kz�G�h�����[��]�Z���n�d���lp��ӛ���f��O��m6�����W(�գE��Ѭ{�&A���^�nh�
�T �Dۿ���){�����l�u��|��z�s �k��O=���g�(��f	�{Qb'6���I��P�����\�YIm�\G $�y�ޛ�kq5�s��7���d���9I���]�豖U~�Ə'x;?+f}�.��au@��A#���.$]��c����t�a��[����
�B,��[�ۗ�!�i ������4#���#��R��Kq�LH]�nk�ǉ��N�k+,����MZ��:Y�%�p{�w�Kh�	>�8��?6��{8���3�1c}���3���a��;�Q��"bB���eo���t�3���Yg/G�X|_����T]{��
NΤ�d��X�F�᫾�\�1�鶯�jgVD���J���+[[Z���t$��2�a|ٕ^7���Ţ_I�@�ҋ/�_o	\Ub��s�͂��5a��GQ�q�|W[5~Lls��bF_�����N��@��+H�[T/�oE�2C{P�}�>it	�A���oV�컞i�&�n�����};55m ؈!�a�����z�B+7n�����p�dg��U�4�&(Cq�P������gÆ�)����tt�me7\j�ҡCYT��ȡkiX��,	�K�s�0(Sg\�)4��gO���1�UH^ƷK ^H�~O�a�ʐ%�0	�<�����H-c1I����y���J2�ta*�@�#&��t'�t�X¹��Y|^\��ʵ�	�P���a�&�ɱ�S<M����w���.��lPF8Cӌ˅\9Jq{�:�O�S<g�y�S.�O3�}��+у�\t���Te!��>�[cȖ�����F^��~'���oR/ �65ɟ� �Y!�9'��-�PZ:n[皭fA2]��V?-)L]�Kx;^���f�����q���
��'q0*�V�z�)i�p$s-&��}yp��``��������΁���d�V�p;���>�k�-��I6�{&�?�cu�\�*rŗ[�ժ��a��UE�T��O�Nڶ�1��hE@�:����h��2���Z�r0�+�e	a�5��;/�˶����$�q]�O�#iyE��Vp����!�X/ɔ���:�h�=l�bt�Y�[����@��e�k�9�o3-B(e��r79ƐP	�^�@��ȗ �-y�5�?�z�Tzd����V�,8�����>M?p;\ M�/+�ָu3|���'G�B�r���wy�}�[�S��@��V����[J=��t�s0U*N��k�d�_Eݼ��z'����&>e�ŢtBd0F�D��pC�b|Z){ 31���S����~����XU���XJ�k�*)]7UB9(셌H-�a�2Y8Tp�R�GV�~-X�3}�i_��T35�y�ԇF���Ts�����	�KPݼ��B^uݽ�'�Y�6:Y�|!�g�{��٧�O�w���*q�ԟ�-.��ܠ�N}������m�e�>AfF��bQ�a� a��& ���kZ��7�A�z��S��~�ݘ�������/C�Sf(�uO��%��`(٨	�d�w�g�[֗c�Jτ��`��Ta��*�7�O�Ӑ�5=����@E�S��J���u�g����u���>ۯ_2�eIꜲ��B�b!�y��Tv��H�������!�)����(�5_�XQuӱZ �
u���lwFrJ��ź2�(�jc�Qy��y8[�>�*F:[U+NG?o���|���>�Dq�cP�~����Yس�Yҧ'�f���0��ݢ��ǲ�ܣ�]���������;`���$��u�Q��R����, r���ה8�S�?.�<AO2w0���Ʈ��+�qFa��P��F�ޑ��g��Ӳ��v,��Ш�G��g_��)��
�̆�7b���L�}���'��Q���i#��:;5�E\��K]x
���%��a"c�|��X�d>Ԟ4�R��X��.�2����Z�ܑ��J��������0k,��]cx�^��M
���[��h�=e?�����3��^گDl�? tz���qy��� ̆ГT+ʘ�Vz;�K�fwaX�S׽�,�<y"Y �U
}��,�؏��l�8��{;э�hbgQ>�p���L����d$e�+GO�z���X�+3H�D�� �tT��q*%��B,%����#U���y���@w{�\��]��c��Z�X�⊇�L|Q�<��g����]C��j��������^g��[��:G-�]�%����O�0m��~��@5������0x�(�鰄Xm'�:ҍ:o��D����Á���Y=w�DYX��&
�����(�%۱�0G9F�p�?�N	о������GMzJu�A���>MȃY�ԘS�з]��]�T���`BtҘ�\C��X���mu!�:z��=���gt�U�%����]�������; c���:�g��>�R.��e�\ؾ�T~�&���uN?�|������U��E�(����v��	�AVd�ۓ����/�xUT�5P"�;W���9�����٦�u�Cn͹!gj�z���6s����/�;l��H]�����P�M�銯]F:X���Ԩ�X|r�i�;�lx��!�A�`S�aӴ�Y&3>���H�΅ޠТd�����X0���|�l�x*�g�Ӑ���V��+��DjO��x6eQ�ĎW���/���f��X�1� ���B�*���C���N�\���.⸛k�a���6{��R��j٪H�>2&� ס����{�W���H�o䃰�*_0�R���yr9�ו��$���R��kj+�@\�5�C��l��5��zF©��s���9<����̹��h*�l��6@���#%yoAs�������>�@���ْ5\���% Q�Z�B�X��m��{��cYۜv��(�������    �K����vM�$)��bp���`�U|M ;_��;�{��I�L�8�JPa͠�����6�����^�{���9��4������1�����&�PC����gd��7W��[ъ��aO��^�ny��P�~�б�y�������ن#���1����$�Z��3J@c������2�Ð�E�-~U0�v,z��ɦ{m�]\s�Jq��;�t�������xq�˨[��~H�^�ژG��xQc0#���7�9^6n�*����@暈���Z�¡2
�=A1� $�h���F�1�<@,��i�q~��?�����X�|���w�k5�;wR�FS+-�+��&5 �X����h�D,�\	�ʹ
���t6�@����h�5ɣ�Ӗz3ϵk��[��(������R�t|�9�_}�t2=-*�h�{ [�� 8����� ��sn��k��s�;�%M�$H����Ww5Bd�c�I&�հ�.�?����W�!��}�}�m��o���sT�,T�S]_4)d���:�x*�M�ד
��4�ܝ}z�����>����OI2W�0��#i�	VL��m��>V�1�F'��H��	����[i`U��@?�]d⌷�9*�gϲ+״�NυƱ�sɠJ5�	���ſ�R!KG�~<�8e&��nJ�L77
�t�ʤ�2��%̇����h/�hЊ/�e����x���"	��s��w}P�������{�-�SF��wO���֐+geM�Q0 J���y����Ԕ9���G���ň�N�C3fdkdC������Epۦ8�T��췺ѝ!�	^G]6{͡vl���H�ͅ����
,e_��pi�R��1܎i��� CĞ��5�pr��Ǎsq|��G|$j�yE|�t�l�w	��乂c��������[{�o_��N��U��M�H��s��q���v�Q�r�>t�⬬�Pʖ|<h�4�`�%X'���>�^c�8y�rǜM�T�Qv��X]�s��R8�>��"��dC\�>+�����)��F�Y'ϵ���V��J8p���Փ���J��I��r�v�E�SK��
7��f�O-�7jsfv$<lڹ�E�>�)*�d���f>v��ĵbb�� ��6j�(K AuG�_���]��U؅Պg{��CF�����������礔��P}E��7"��c`��Sby��"�<��\V�:�$����66�
���
�l�����^�<�gY���4[IO��>g���W�����BM��id�i��C�nH����ai+f2i��%��+����u��W�:L&NB�^�o�C�5��:/W7�|�p�b������_�5��	��3B�Ӂ���0>���߀UYYKڴF���oF󁵞�޵��g�H�؝C�����5/4yҥ�wR��y�w�ԭ�8-�25<��Ň���m>d*&<�u�f��~U\�o��b�Fg��Oo}bB/�@;">sS�4
��ۜw�Y\lN�0��e�*�p?���<��A�>�n��^�{ٵ����&�$>�4n�4<5��/HC�A����>���E��hp/7�U�F)pO��O�q��!�O����1e��<���k.F�>�U�-`��.uOJ(~�$�0_|#J���,����I��1���&�Ƅ���y����V|�B���Bs��t*��b�g��|�jV*�Bc�u//��	�g0Иs�@�QϦ�/Pbe� ۜ���A?Lc0��N��� >�$�|a���t�bic�}�5��ݠX2�̨�9w(\����]kİZ<>vh>� ��¾����H|@d!ɚU����w�F\�X�O��ۖgC��υX"��->�!/ũ�t=%LY�!�KF�� ���}���6�$I-���y�S/r(׌˙�T��4���PV�b�^����* �sE
�!��� �����>�T ؜!��K�[��{�6SG�⥡Pq(�.�T4��X��{�)����!c�4m���^Z[jgA|��صȼn7a.��7(���	3�8��fA�Ň���Z��K�aQ��ʿZ���:ධz�7񷉐�Y!�]ۘk>�>o�tۭ����?����G��kC����Q6 �A�t�q�(J�駐b482��=c[�����Q�@�'���&���VDT���� 栳M�7aT��l*�^��Pϴ�)��|iF�D�᥉�g
�~�Y�'e�ASVY�P���;�pSJ4܋���*&�X*�rS㲙=uZvM�_����d���__���<���ivT]�% =�����4K���!��T��+�����(��g���c�Ÿ2�x�ܪ�c'�o���ʆҏ���j� �w�i��f�'!�,��FoL���>I��˔���)";��ZI�D��n	�/�N1�A�_T9����-� |B����c@X����mVC�b7��:c��SA#�o�Z�Y����m�}h3A�t�1a�����
t��r�0u߱}�"�|����3B(*�P
X��Jo\�v��.G:��֡P��Y)��F�]�@��H��������]�>�X�<e��g�ܼ�h������Q��!�#1�.��NW��㘶��e�0���T��Tq4���u5 �!1��&߰xq�\]֗�m�p3�]#�Ӣ6w�9#k�?Xm���� sf�a�}�1e��'8��~[�U����7�Vb�~}��-x����L;5 ��W���.�O˴8���2픙$j��m�*j�4M�i�L�1����TRv���ϔR�6L����1��o������>6QNV��FaWM�vH�Kf���N��嵻^�E��rL
cl;ӥ;eɧ�5%<�mz0O�dIXp��x!���E��h�zef)h8�{d!C�)�<�K��e5�͵/���q�J#�g�B���\���9�̯�syI�R��
�������,ή8���Y����R�=ҋ2��׷��j��X)m1��9��9�fp�؊�S#�֍"��w�[1�!S'��=\"�G��6�pu$�"�s������z���+]-sS��Q��2�ة��e�N�i?�O�h{r�4ج>�� p
�șm5R�E�Rv�B�*7�j����VA��(;��G���v�	)�L� ��J7��m["��֔^�6 ��8��1��|�ZgX��i���pYZ���{��⯈+���>�����Rd��FÉ�-cZ7�s�4 u_���L1{�qW��۞,����$mq:�?8&S05��u�����c�}�q��I#�3��Dԗˁ��h󡏙f���~��*��T� ��/~L�%$@� j�H �4_ee���{=w�ؔ��V�w� �g��?��~[H���~�zEV��*6��i����I<jF3�#�^rz5� `o�J��)�PPoy�Xz��E*����cͦ����+�KאW�+�X�TC���C�yW^���\�<��(���z��T�vjr2���[$�lAۈ����a)�z8:cPE�u�0C��χ*��@��� i,/]>��U2Y&���e��u�0�P�*¦���VưT"T�sHu�H��A�V��Z�.��P��n/�7�@|� 2���q���x0�Mn�&����}fU�l�RP�;`5;�g���x�w�7�q4Z
L��"�}_P�>Y�6uչ�C��Z�z���*��ӌ��~�.��6�li��׆З�j���@q���jGo���^�w;���ڎ.>�`�(���"�@�(TH�/^0iƚGgu�_�/���}t��\"��.�E�l�@���,B_�'��\�1=ķΐ#3\?��·�R�\�O(������:U�(�>w,�v���f���.� ������j �G�qw��b�����vU�:�YF2%�"jq�|��ԉ������ҏ����W�4��j���Rx�����4c�fbb1hu*�wwid��P���:��:��u�ɭhz����S_D�{ jC?��\��Ԗ��}��wr���u��rn�(��-�iA��z���|�L7�`�%�^g�\��Zު>y��v�zo��&��"� ^���5_|    ����S~I=�E��� ��A���\˰])�Gp9��O��m�5�h�U�g�E#'�1Ou����q
B)���������2�&�:tb7>-(��+-�Z!Z\�b�q�i�G���M]4��ؤ�!�eS�d��X��p�"��@�$�MC⹦���&�8�}R[��tV`u,9H%�/�D��P�P��SކXY�̔�R~�0Z��x���;��ܑ1�X�[�(J|@y�e�lU\.� ���3��U{�&�V#����:L��z�<��ɒ�D�k�)d
�V
�;uݲ��z���%������/8�9m�UЅ ��*C�;�RԐ��Fg3qy�me&*�D�"h�'PE�E&�����i�
j�Ia�kX47lZж��G�8� �A�x�����6yn&mĐ���IWex��[r��e=����d���QY�/�6�q���@<�82�*�S��]���!'t������N���t}ā�@��R͒}V;Kڤ
!&>zԣ�7%�I�1X/�u����pMOQ�3<�Hq\졅'<��]|�t|i�4X c9��5Q�h�h���t!!��l�q��vU�;�/A���|^�Ho���1y鑖���W�պ@��t����&��`�uZN!t��֧HW�
���+�ba�F^y�ף��F��p>������+��:�(����O��DơK\�ʈOډ��L|�G�\�S`�8��0(+3����Y�Zci4������
,�E��@]'���n�TkX;�m ���H|��C�-s�N�a�8���_�s�?��#�����J�A��� �S���1b��Zl����5[���d4�y�Ro��������A`H\=�ػ�� �P�B�h�N!�Qgc*���r�`�yI>V��&Xߦu�U�b�R1Yn��@ta@��-Yz��`[H�vko�]��h��(�(�����Ò��g�%��R2މt��M��HW�%+V)�??mW�$qXU,b��h���Ojv�N��m�g�]��f�0'�'2�����iY|!9-�z�%t,yJ��u��؎Q��vijląï�"�97XE�6��8�ݤ��_Eg�>���3?�����@ࡋ�l�a�ݰ�c�$D�V�����no4*  �#��O>��j]��Ӭ���*o�_����/I�X����?U-;q<"o�!���H�2XLOƵ��-�Qm��Pk����p_t��l-�	<zw7�=��F��6ԍ��.���0�`ǲ%�A�y_��3O6���2�3zm�8q�m�f��>�Y�����)Y�	G̛UD^b���(n*����A�6V�R��E/�~ĸ�:��37w�9�G���ALbU���Te����6�9XK�)]�Aw���z�n����Q�\>E��C��tuZ�N-L��d˰��-���������m��#*����VY�G�ٷ�>���t ��3d_�̵	]���n~���[�#�֑*Ĺ����U"��� y޾2�,!�hI`���Wם�]���8�r+�,��t�Ұ.>,x��7�����5��q�n�R2��t>�'n^��Kӱ����^Ӭj�d���[qgڊ��z�ܲ����eF�X�L<���].r�'�F7�A��SsG�
��=X�vj ���]F��NH;ܟ��\A>��4�X���O���	}���u�z�L/�GH���\ �Zb7
����֖�?�Hn���*j��lЃ��*�J�HR:b�][����(� ��_G���R2���z|��`I�8K"`smF'�N_���yV�������<3F�gV�$��07.Ԓ�_�0�&��́ Sұ�<O.Ȣn!{Ι~>���G��/,'��U�ۅ�8�čC��&�tz��X�@��8Җ�j�YQs� k�i�n�#��bth$��ե�#$����h'f�?�G���^2(����rn�JW��D9Q��C�;C:������(����7,s������	�|o� 2m��ԃ<���"��)�#��8dN���B��Q���EbX��U���pM����(ݼ��qS�����EX�^|,�,#JԼ����@[����N0tЯN}�&\����X����=y�;�&��{4W��k�L ��r �z5�ۋ/�#��"I3EX����R��I8����;��U�TזGJP
����Y�y}UH����X�?�e���\�V��]w���g�:u���$R.)\}��q�7Ě�� ���AA�VMxisp��S��1 ����nu�"�Ѧ��_����$w��B_�*r��1�A�(���a�i�>��B*mW�3��}V"��+��|;Mb�8JZ�/��v~�U�,Oc�8� �N.I4��	B�Yr<^���>>ljGl�?��3����bV�)f�Y$����7	LAҌ�����g�Q�u�%��v�tV0)sǅ8��x����P�g�H�OM��2NKU��2�o���4�
\��C�uE���-��
���|��5%&�K#��}�`Y��ܛ[X��%=���I�:�h���C�M�l��߫��#�GP}e�ꛜF���`і�n7���?�k��u����/�V�Yꃶ�ɉ�<�1h㤍SPM��T�D#��i ��p� í9�p�bY80��e޺����*r<�j�̙�И��>$�@���F��Vz��3fL���:�_�5�����
]�y �lF@�����֯��[ȳD�qo�#�HH�(���p��Ԧ����^G��!Wc#N%���g�{$A!��I���X�D߱.j�W��1bF�����vv�1�q(H��䫍y��ck�Cv��|@�f�0�H�}	��gz2aU�q�c��M%�C��������aQ��7Y���*�wᣥ�bc�qs~$�$5Q���cuk�݄�VÀ�r�_�˫ n`��w��n!��+�=��h��Asc���n����P��� z�H�څ��H�� 1�촣'a`!���U�� ��5|~٣�cKr��d�����a�m{s�a�o��*��E^pp��A�U�_��q	Z����E1'rd�I�xH�i��B�R�4:��7wX��;$E�8B�1ݑ�tG�_��#P� �.k����ıl�1Zȭ��)�0k�l������ e�=U�1V�K�&��(�E��5�qQ��M�F?�� 0�����=~8}�o�1���V���_�(ڜ���z�|����>�����Q}���
����U���"s�X)���(��į%T�E.�
�6��(~c�PK@�w)��&e��tR7P��	L�<y�L������z��5O���ʍ��J��ƕI�C��	a�X%S�X��R-qb�t�%�?@y��!v�h6T*r��O6�Ƞ�Z#���� �o���}��u�f'�L�EQ�+k����)�7i�j%zB&����7j)_'�ꅰ��?��Q�/8G�$Op�,���fcf�|�}F�6�!67���W�jU���y��G�p��sM!ҡ�«N/�n�����u��RԵ�fF�P���V�?Ur�� 	��F��
��\sVήw��<f\��� �{@�빳���+|��cuQ�A�[Sm���iI	�v�x�����y=Z��3�L=��z��s'�m]�������=�er�dI-I:د������(3#�v!r����=���a��~|e��U@�X�4{ub%A\n���B;?�حM����|4�\t�����N�H:���E���Sj�o�X�P	���r{�N��{hs��W4d��#ѹB��To�=�Q��)4 ׬�B6��j�[��AG:�ʏ&h֧�)s��99���~q��r��/`A�Nh�A�yCu ��K�F�G����n*B��$/��L�``%ʩ�B���"ޣ�f��	}q>���Az�,��\C��ݽ�$j�1D�f�Q����D��gHBn���7<��=�� 1���ks�,-��%�~�I�#�)k�zЛ���}�����M��;�$U���bL�XV�M*e���V�m�j�b:wU����������T0�u+�ke	�Z�ee���V    45���S��{��:X�kl�.����L���m�lwF�ɹh`��䝦&�*��}��,{�{��,7"^X�K�7� �Md�_�b��`��Λ��p�q`m�;d�[�"Y�7c.3�X�Z#�l�5P���-EI_�Z��OfMt3.��ź[�ɥ8�^����$>�s�T�E(�"&F	����b ���)e~ڜ5fb�2��{��Ը�\;�;��SPTȄ�m��F����T���p��`�f�X{��.�$C�T�CX��1���<���&����\S�rZ����){0�>6��h�Wᾂ���-#慕�!��٘7"Q���� �/0���a���Av��%쭈X����%��1�=e���������>���03�H��"%v�/���Ĥe+�����QaC�d��3i&�mfh`�͢�6�:��X���5�9RM}���`�u-��-�"��\��Mz^�e�3NWɒ�}�ѿ��ڴa�����mVW����aE�㤕��҃~l)��f��mQ9�L	Ѐ q nE�g��[r�\�y���l+1z���F�1FG�.�/�3�FQ^f�Ň�4L�9�J��2&"�Py�\�.����-5}��5��~$��l�H��a�75&�*�f}.Wn(����.���ʲ6Ag7�����#$�N�m>|n��@���6�6�@&ql�C��kS��5S��H3��r担Wx��>�P/��Y�SDd\ A�LN���>}&vq� $_�ꏦ�U������9O��H��}s��#�A_�rT��NT3W���T3���HL�G4����atOOM^��98W�fe�����������mg#�2W���,�K#��n�=Ș���LR��_N�芮�����+�f������T�O8�m�֠���t�{a8� �lG �3�|0e7���&~������V�C:m%q�Op�����N%s{�r��u�B<�Ƣ]�K�s�,�á6�ٮ���p;�iz&�8aO6�h�^7�^���K��Dl�Q���ak�1�RrX�G�\������3HAx�]�|`L�<�P$ZZ�z�� �B�{�̾��)��_~*<m�=Fd�����@������7���Ԡ0��ں���阃�<�̪|[��;���M���|
���.ͻK6�u�Lo�fO�Ob���WUB�Jߛ��T)���[�mZ)�O�	A�}di�Z� .�Z�Pd_�Q*�$|]� �<�b$�Fqj(�r��c����Yfڭ<�鶽�f(~�vSj[e�� <h�$�,9e�9�sǂ���a���B��~��!?"���F_\4�aJL�Toc�Q�ե�L�1�z˂g�]/�	��L#@Xd"R�T�������W����9N������E�T�=�<���㋷�j�"[L��ݢ{�)� 8>��{(�-�l@X �A��%�_1E�荁�)�S�?H�Dl�`�vUm�X�	�]��wO��iM�MT�T���~������%"q�
W��@J����X;����C�mT[�v���F����\=�3�fr�HƏ��Rz��o����x�s���/fv�*�u������U���rw����c욿�qu����*H=jZ,n����V�<QC*&HE�3Lv@*I��8�r�?�$���=�I8ԑI�i�K�_J [���'Z��H�4�2�L1���۶��kN���H�)=Y���p$��KW!B����(nƀ@���1{i��֊�����Pَ��F�A�Z��W�\n��mI�/�Ñ1AU�x#z�����B�>�}'+�����NFMً�YҬv��$�+�t�e�Eg���|��(=c�{�X�{%��j��a�����'QK@�
-���%b�)8~qDSs��^�<���|��QL֟���0�]d3�e��F�&�j�j7�F�rW�'��D���Yqgq%Jt�a�)q�1�v�l���N�%�)Xy3C�}r0�ݒ���v�r ���v���Z2u�����E�D�:m�٭�w�h�ݯi{xl����5��k��,���9�B���[1C��7���r��BW',Wi*\?v8T�@�S��-�q���Ы���Pl�v�U�3̍��}eY�6�����9*�O,V�3ե`�AO��^�x<6�D�ZDe��n��q�[!Zz�l��!�F� ��tPE~���'m!��A�����"�ˍ�.��·�Sؘ�NU�T�h�Pc��.�.Uk��H2� )�L��*� ���AҴ�;$�]~wϝ��.���G��׿��k+����/�C�@YE�����"���I�5T��b%upC��
:p�	�ύҜ(C�.7����_
��~��x� �!.˹Er��~X�O�Q�*�F #Ŭ�I�@��b� �۟d�\
��ֳ���߼)d���ԈG�gR^���p���������{�����Pc1��j����{L!ZJF߻��m�X�J��R��D)��s��AAے�AoK�=sHG�Xo���@�X����,K���K�mĵC`�y�"jT{ �(��AC��1��60d���A%p�L(��RZ�cA>��=ű�@?ۣ���'�a���_o!�or$�|�8-\�`���]���Q�g�X�L{!3����IX�M����s�@K�UGf�G:VU_+ZaƵ���ț����*+�* �E� K�D��c��vHBNі5%DK/�&��%���?�L�(Q�nnyp!��/	�EՕ�f��RD!ԫG�i�w�)|����y[�^�����Rt�}N���0��:�Z�p?�T���E���!���Ux���s+~@Q\چ^|p�/�� �.�Ӑ8F���ႀ�G��	^�ӣ��O1��
�Y6O�&`�VF�u�!�N]ġN>�ٶ�e3(]��@W�4H�p$�SV�B�1���/~&b�*	b�� TU�_NMFD����M��~�������m��*凙T�lU�\h��|�mU����I"�t�:B�&m������Z�MO~x)��Ɍ��##X�'+�v���F���j��pdc�Ύ2���2���m�V�Lh���3�@�ڹ7��s�7�,׻�X4�[�<7��7���8p�*�Y��Y��}�tV~6�h�E�N8����U�{(o**��;��I�wjv_p��r]�K����,���pU'93�k�Δ������.�������i���pٖ?�0$�Oy\6�Q�N�b;9
��~�j��q�%dU����z/����2�<�J7�Z�s߁��޼n��Z�@ع�ͻ�k�,>+}�0�N�W��c�i����kgsv��Kk��X]l��&}�thj�	���K��=��`��X�n28����g���"xQ��s0nJ�A9��̸�=������LO$e�H��z�>��ZEEe����-����s��Z!�|!�Ù���:3�Ǩ;�&u��v��#�@.�����9��s�!"M
�N�s�ĸ�y<��_�7�b��.c�%�K��_�n�B�e��so�W�(�#��r��X�F6ۓ]<7,U"K����a<�E��ܘ0;�EqguH.��fY\�O�7��ד����5�	(o��gƻ�z	hK�aH�9�N6sX��'��A@��!�fg-��.�Ųx�jKͨ-�^JJ�c�d��A1�����7��yPf��Ԡp|�y�x=�c1�,��U��R�h�}a�ޗ8^�3�
�p=�Vb@?���Ԝ�?a���|F��A�OZ���	�L�+�ǓR&���R9̓���90�$��\?���=ȋկ�����Їd!�U��r_�A�fe�y�1��Oz/�F�U6U}
�q_5ss7�w�~o&�Ϋ�0�͗M�}�0'7�HS�bTS��r�N����߆ɮ?�����F�*Ix�B�)��P/��0��}���v+n����VH�{ݵ|���ɐ	���c�����#CBz�L����b�'�pE|����#��@,8���c�Q�.*Mel����3	�U#�M��ȏ.�������t���	��-�+�%    )~����dҔ�ެ6��j�������0��G��E��u��UǗ�r�َ�Zn�2�PT���6���-)�\���}�<ad��݋�c'��"F�D����P��I�p�OYB$A%�p�0���`���>{�b��7�_�C�n;�;5t�����i�EFj�X��_�x���u�K��(Bɨ��G��<M��*���\�Ë�6��:f�Ġ�Kn7�t'X�Qn�Q�����Qq~R�B;�/�jO�s����]��_��s�ڏ���"�j��%�A�=�'V����2k-UXeB6��b��Τ0��q�D��s𐘢^����"����(\	/l��  ˗����F4�>W~�y�5M�r���q�|��ԃ�G�C~�/>B�?8P��'�T�r7������p��/�0�OY��.=:�z��lAi�
�5�"�6�O�`�����IAPI��� -咯G�g���i\
Ϙ0�We��;#5������	���\�6X�Uy��@�����c:�T�q1m�������,�L?1�ˣ*;%����|G�d >�ʈnFxC��匪i���3G���햵G��R���o��;�#W5�˲N8J-2.b
�-�D 'A�A�A��Xl�KdK��aK��_�߆*�07�[��H��?��t +�{�PR6��`H�P��,�ʾG�_�<3�	�*N6Whtb����;�`e�ys�?��3kr�����tv
�饆}c��}?6Ɣu���K3�f�1Hl�n3M�,X�o;��������=�&����\(�Գ�{���ވ���ڍ����'o������G�y�6nC$�a�(���~e��u�e�mQ&���S�b�>���C�%PQ��U�(��ě4��ULN�?��v[G��G��FIm�$�ż�%8��M]Y�Eн4�n{X���/*��Q��	w���_u���Q�G���H�7N��0у��m~x���dX��2���tPI��(�����F�'��,�\<��	���9�����Z�ޚ���e��f�+��$L=���ՙ���Z�)�A��^�=��wd�~��	�&�t�r ���*��{��k��F���ߘ;Ltڜ�>�n���CAAX]+�(�x�G1\��<7F�hx&,�s���z����N �"D����¼��փ�s���T.΄�/NmM�湝�Ŧ�>�P8��/�6O��� a/�lI�[]�
�1��YOӔ���l�G��@,�+���}�v���a4��Y^mj �ۜǍ^������n/�,�Vr4��<���ʡ �K�1`���
6��CT716vI��q�ǩ��s��l.�Qh��<-���b0d�?�i=�/v���C`f�.�N��W�	��q��<�ŏk7��=A��m�abV9JrƮ!tSxipwG����<��[��ڧѦl_�cR�St^uŀ�1rx�)� �Pk->�� �#�=�u�I���5�R��D�W!�=s��6X �;0,C>�	��sD���o��ڎ=�����j�"?r�ݯuv3:8M��'�8�bm�n�K[s5��%�����E1��c)�k@9cs�%��Q���*Ua���`0����m,�� n��x;�\�7J?�U����N�
f?�2Q�e���ƅd�T�w������t�^�t�L�Iَ&�n-�ӏXG
�3��X������j���`j��`ӫ*�	� ��=����YF��+w����+�)І{:w��o�g�����ͤ��)�W��!ޮܿ�?�94z����<��0�Ǌ-���m�W3M�/���Q��-�&75V̼?ܣ�=R�xl���u�j]o$��Wk�FU�+?�>l�ƗUnC�}P5�Ƅܓ��E���B�Ҿ��㬢����H�fڈ� �nu�G5P�i
���Z3�Z�c 8*�h���K) �i�0�)�`S�]����� ����!�_�}������L{��O]�{KgNv&w�z�Ω�#���
o����+�[���W�A<�������������Q�Z#>����	�"��~E&C-�X�dd�e����*����y��b"e}]���=��+ߧn�o�u�z���Âu/}�k�D�a9��aR��}��qu1R,�d�:k��B��K?K<@�`QV��7v�4%�L��֢W��~��-P�����
�  Cjy�(�I�A��@#~bE q�<����=䪑��LCϳ�Y����pk��r���suLA�BRh�l\�l5�|���T� ���ϵaϧ�QVMc0'P��_
ę�Q��bPb~��kU{lʁ)�:�"�<�� TgTͶZ���Z��3��R+&��ˆR�+S~q���|;�-a� q+8��mù��Ha���я����oV��� I�Ok&�Y�{[���d��*�Dzx	���p����K�Wx����)`Z&�%c�4'���nM>/( D�M�>���'X��	f�!��W�z,%SCӦB�h;��ԡhR�P��j��Sz��8g�<ad��D������l������¨`}q����1{��X��R%�����T�0�@_pXݒ*��`O��$�0����#M���M��Q@�����1i�Ya�����ai���M��8�ī�_y����֓��,���=�aF�L�fq?�����IGqK�����G�@��P���K9&�_������Ŏ!~7g<�V>P�@\��hX��	9Lc������(޴h�D��{�^Pu��9#Ǣ�C�
T`F8�.�	"-X�1�&	ɃC����j�r�{7"�25vL�R'�v�Ex+e��&I��z��\E7���.�6�Q�!6�'2�W �O:�Q�=ܹ�$�:t��m�n˟@�jSb~�'qm%n��FS�B?H�Rp\�e��俁gu:Y0hE�l������'��I�Wjv�^!�x��Wz4P1/���'����k���g�J���3�ڵ."�P�0�� ��8�?j7KrK��*h��q���@25q|��WK���5ȭ��k���V���:wx���>�۳̎���2$!���Nz?���wk1���T����@��T?T�8�*�s���1�Rmy#q����`"��n|ֹ��v|�����S0�-���f�Zc�R�T�H��[�d�
�U�4�~�ܑ`��t�F]�l�g��zX���+bqF�3���W��-r�7�Sf`:c�)���U=�'�|�\1�Ȍ��Շ	D�mi�W�	7�PȾ����k�D��_1?O-���!r�]�rj��P�o.�啟�5�2t��z���R-fA��mL���� o�}���5���Ƌ��q��U�#�c�د�Wbmt')����L����<3����๤z���g��hܪ%��q�6��2s���|�l.穲JL���9Է׻U,F��W�;�^�$I^�3@��,������J���(��SC�o���*�
�0�x�zCi,�� (b
���(�a�?N�8q��L��w@�Hܜ׺�i`�@8#k��0�w!�=O����=���8-꺣W�+��D���{�1c��=2j��dR�t�R8��1���6`b��)�W= �#�F�Y�X�T��B^s#�sm��pyO�:�A&��JC���BϤ0T�%�>:;p2"u�� z�P�,5sF`W"��<� .�%�Ru`�y�]g�I�TfF(2�5wF����k�E����4�%���i��Q�E�Rh���cz=��X�d)��o��]��q!O�:→,-U�{�Z�2\���0y���00X� �y؅}�Oz��q��9 DW_%���9X�[�N�`���}ٿ��Vic�f%|�ڨ�=�;��m�{զ���"+'��AAU���nU&DW�w�Sڪ�,�Y���Ņ��)
/������z���4s�	h��i(��H� �����
�V����	`}�
C�`j�bX��ͻ{)8!��x�Ϥ@Ē�9��g������c�=tS���k>�6D�W�+Jo�A�o�
�3��n�����$H*�»*L��&,��������+��D�Cx������/g��X��}    8��a��%���v���ϵX�U�d���B���\]�1����`��E��S|\�lĒ;���������Dٍ�%�q�k�pmΛcv)*k*0��hҫ{m@no��8�ј�>ܺu~��R�����~��w,_$}w��a�|LwϏ�n���d�	Q%�=(�eV���)+0��:>6]�n�/c��QM�[jgYAm-�yO.˴ƚ�z��u�ޏ��{'���-^���"6p�z�9���z�\1'S���r�+*��`n]���P�\�O��1cBǴ۠�$M�X�CC��s�1��:����Gh�A�s�Yȸ��, �2�pxH[|K?.4���55߹7<Ê_�2�#&*f������$h{@�2��-���a��N�������S19��G��p�����_�P�H��`�s �/h�$vl~��!�u�j�w3%��>��o_����j�I2	Zg�=�˹:��P8`���(��$�� �F���(�t^Y�n�����#�s�ߡB{RlG�ٳb��M�̢���\�'.)� �;��)>EI��V6�<I�'|}�O����@+��ڞ"�}$��p��R&~j_�ի�am-Ц�n#��֐�$lT���b�ޅ��[r��e	�i��:w<&�ET5��C�LK���BA/M�%�k�ϣ��p�b�43srG�!�͵��g�5�K���-�K�iVW�����5�|#<�G]JHZɮ/h�d�F�uO\�h����X��c�<���AQ���Du�P��H4�Nl�O�� ��&2����#=�:�I7((�#��|�����)��z&�A��'|���Y��J����j$��X�'�����FI$aI�E�&$�"TKz"3 �]�&Ox��s���h���*O�g��Ô���5� �D0�=�ߢ)0kC���\-Z1�GM�S#@���9;܇���y�cQ�[2�0��ZU�?���t���꺐�!69�sg�&j����dg�H�M�����^y8�G�?皎�O�����,��жxA�Ŭ��954��Б�:�������^X�Pԍ�8􂆩�a�u?�E����G�$q7�����2G���"`�j�^�H�O<Ե��g�P�5\ĭ����B��!��ު�c0w��]�z_���Q���T3��sF�)�d,.f�1NZ��o���<�:������m�F�b�G:����8`=,ă"�������l���m�� uϵѕ��*�XRKG)y���g��b����x����?�)��cY��tō�P	���g(�]�s�۞6�qj )U�Q���[D�ݷ��$�� ��E.�l���SI���EM���QԠ1�� 50l%ĔA������<\d%�RT�nH���^�l��Qn2D�ڄ�	g/U�F��Z�Et���en�r���O��4�n�ǡb����`�8�9�;��9nu�ycTo��N�
�
��.������S�"�f��AJ�3&K�1������mIGɻ⡿���e��/�E
�Pk�{Ai�T]����Y,��Iݖ��Z��>KtT��G�AQ{h���K5��	"�8^�����v�`�x�1

��L�$u,������6�!Nm�DԷ [�W(,K�ɐ|���0��@��;@�X�Ga�"���$��P�i\��>�[���j ��y�n��.���@�ϭ�5���m���6�r�����^|Yv������8���c��9����y�S�����B9%�Ik�̩������V�-��n�^��B27��d����K'��\F�!��� U��c"���w��a�~r�Hr�zt���z3��`#��{�ok۹�kݭM
�#A/�X�M3C\>i���x��I��E>�%lz�f���c�U�ݗ/_!_ո�b�^��w�R�!sU�i� 
�;�Iu���&��t�`��P�D�
���T�����d4�"�oٟ��^��bh������(?��YBq��#y��d�k�����^��Ec0{l`�XtEYn�͌��Iv��|S��tR�>_&��,� #,[����S��b֥ʼ.[%.��H,,;lQGr�'O�z�X�?�����PUzm����!��V�����D�=��; ǉ�3֯����1�/1&��*,n��?��� pʞR���bj�I"A�B�%�Y��V��S�]��!'���Y�z���\[����&���),]�`�����J%P�Jc��]����O�Y�+ojPx�W����?��t�{�]�+�E�w�4������Fif���on��f��z�-���c���Rx�).a��q��V�5{��d�J�K��9�,���w-}�jE�M��M����?g�>�D���԰�b��k�ʓ^��gV�<��_I�e�L�Ѽ����{�ꚝ�/��*�ϻv�Xo닑��w�������:EЗW���n�O�m��1��Y������+�q�/f���%��(��"z�>�ǔI.M��&���z�9�Y{���a�EVS� ���;�� 7=s�y!y��ꮂˈ��KP���&�ܳb�P��T���N�(��77��U��LV w.l%���W�V�O�Gs������j66s&��>�Y��c����Kp, ���gU�8�ڤI���3�rۇA����W>���)B�3 ŧ���R� ��'w���1�$�X$U�x�>������\��]:a�p�%�1hB�*�R���=��p^�҃ M�+�#���!]h���^���� i��R���Ѳ	��]ۦ��˅�ƚ���;FzC7�Z��@)fxk�0$�@\��<�k,��:�v�\n��Yl����ђ@���� (d��H����Fb�k���;�t���x���~�<%�|� �>���H���I2���˝2�]w�m�i����JFg�Vې��]���$6��q0*�����@ "8B|Ӡ����aao�����=�h�K�LYU�!��ߊJ�y(U�nO�c���č�����yd�|zN�
[J��q���)r�K0����Ě8�w1���&�Ʒ7�l�P��a�K�3���&~��+�T�C��_j`��@�n&��G�׹3����*;���.�F����&��`f�2��.@*�2���8�Q޸,�Jw�M� Y�$s��\#o�L_��d(CQ���4`�"+�B�R6s�2������@��(a94ؤ[
��)o}�ݱY9{,|����� o�}�݊v
����+�Zn�{�П@�x��K��qH�M9J�mr����,̙
n��{�ޜ�a����\�n�Z3���^l��AYu��,��:h�I��4;,h����%fSK#7>�gz����u���/�_�01�n�GҎzV���V�L�����1<��RݲJ�.=�a��9&��������)� �c(�
�61��V�R��,:\6�,��lVb�������!��Sϣ׫���!���lS� ��Oہ��fm��9pL�5J��T<�v"⍊��C5s@�zU���n�i �Ig���U5W6�a�Iv�%aM@#�RB7�d�C�ǔ��0�_�4/O���[���iI�:c�?�d�_%3�J�YZl:���i�o�ht�6w��9'jh�9KR%l���!c����Z.�`��L#	��9�����(J��̅�|��"���cGǫ�7w󂆄?*��_'e�\�o��E��?fИ�`ռ(D�B7<2�a��ץ�V�QN�6���`Ί�X<�G�;L���(N�6��$ӣ�s�E�@-��A3(I��d�̖���j��#�v����V!wL͋�͏�E�1e������ΣQ��i;�+[r����c]N��ޮ*@r�4�=k:4���[d#�s'�4x�"� �%�]�r��Qk�`7�\��D^��\��Z9V:��H��t���<���ػyI������	�;%gT�ȱ8��A?�em]�i�#� ���3p�֒�H�8P�+���U����Y��|��M���8���h��U|���2�9�Hf74���mW�K �  6)�c P�
ki"������Q�b#�ǫ��~C,v�JS��׭�u��إ���}U@yQ�槆YHo@������I�F�W�mw��n]F������]jgj�4�9�0����I�p/A��U�3�ΈdƛT�Ԙ�h}��i} ,�ݪh!s�4�6&N��Ȏߪ�c7�ʚ���MKE1�>}H�]lv�%gU}Al�6�e�!���&����!RW�m[,0�k)
����a�˭�)WxrW��z��7l��8rj�� �_�������E��!RZ�Ͼ��$ZO<��+\	�Zӷ�_�u/��x�_@a`�6@�Ds��<�o,n�&a��Jc�(�g�������Rf����52��8g9�E��*Ad$�=\Dl�;K���X��*�k�X���:��[��h�Ն]�j�Ԕ!�X��]��
�W��������>V����?:�~}���W��;`�Mu���#K�+��Ɯ�a&��l�0Z�@�u�a��f s)Q���yc\��n���H� 2� �����g�x9w���$�n�.�{[����O�4$2��� ���A�q6��a��HM���yھ�5X9G�x�M�I�B8]¬�ɏ�n���dꀈ�I���=F:f��^=w}x��W~���b:�\_��Q��@������	��� �����,b,JO1ٿJ�&(�T���8 ᬔJ%����
7&	Q�PR�����̡c��e���.�2�5t�G!P��ڄ�qM�	��q��V!�	
vĺ�a��j�(�'ds��m}�`u���]H����[f�f��Y�@��
����NY�}��nup�(�>�D���䪑p�V�P�6�DP��QiH��B,W�އ�9�r��p�9lx���;>	�$��cwK<x�CՍ*���i+�.� ��NI]�F��G5$�e��,�i��é�`��Ix��+�ܜ�U5:�<P�N�e�����w�i!��V���0H��|ڀȖC,܊G�0��fǋe��H�u���(ف��� U3ń��ht�>R�y�:�x��Ƒx:��N�
�1��
�'+��Z)����;s�p=�TDy�Џ�L��~gg�ky)A �KU�e�w��K<��meMzS���wϲ�Λx�.���@.�v�i���O[��Xg�Ձ;KNom"8�;FZ%�k��t�L���i!�k����H?���1�9��ڲG�Yk�"�ù%E^�d-5M��qh&��z��Z* gS����-UK�6J�g�'ש�#��)�/��]F1�����}PC��#�ky�����&��-��Lcp�W��g�#pc�Ua.�o�CJ�R��cy��� K]J��y�0��;2�\�����X["�KbRMκ�й���U�0g�<u5���^>y��bR�f4A~@Ez!	a��,���r𢙳����>���� �ȟ�e�fr\��}�w��1�.�C�@p�5/1cL���!*��sOtZ7#�k�us}�� �kN��� yf⼷��J����z��bS��2��p��˪[۽�����EN�XB�C�ժ�Xq�Z�\p�j@.HHS)�$�����-	��K,H��T�����_\�c�0Ֆ>�(���IYT���p�� &ؿ�S݆�
(9e��A�5~�S��h��qxYA�~@�ʉ�Ҝ�2�i:�~�7n�CX�$��Շ3Rd�3*".�F��1�w���	ԥ��i�F!R�usIzv%�9�kmQOOa�(�%�t;�����������)�#�      �   I  x�]XɶĦ\���w c���mx�g������I9q�j!J%	ݧQ���Bƫ�Y3VG7��C㏈?�}�G|8!��Z����)��^%�!q_lQLZL�-��Џ|)x%�br��T'��(����%u#�H~X�B�иp^�/�J�e�_J�ā%YGBX�,,��'���8�xIJo�y���du I˚���/���N�c  *G��*����h{ouvE�A�2�ej/f��w���;�#~�P�(&u�ݲ-$z��ź/�1L=�a��A�'��Y<T���U�u�s3y��1�~�m��K�;�?O���P<v?ny+�;��b $�ۦWӇ�	����E$or!�(n�G�g�1�/7_ruh�a��,bx�>$՞ԫi��Q�U i*���_��V�NeS�b�!Ah����㸍����bs_���֪?P�N�.��=��s��3灣�6B��}9W
�ߋ�b�⓼� T����>I���KLkl�t�n��3�;և�,cu����Ȟ�.�˙%$V�qd2�$#G����/~If�1���H�f�uH�t��KRd�M=d����RW�	B%�'��5��$[��a��d9_�
y��`��#4-T��X�$��	Q�u9����Q�I���� 4Cmoq�/:?:9!YD���[�Kusw��ǅ�p��$����R4w3����15鬬3�;�$/��L@�V"l�{�6�D�d��n<l����}�5 5j�������B&�6F����ub��[���|�Ei*Mj�HE=�����C��ʇ�P��ӡX,:�@� �-��7u޻��6��^�G��!�Y�*x �*�B�c�LZgC�4��<)�����ƌ�L��=e��]#
� �G~�P�A�ޚ$��#T�2UR�9���NWz	�m+���LA�4�Ŀ�WH�U@����ZǶ��c�߼z�7��M�g 13�x��t���X��-�e�uy-��z�;�"֘�4����l߃��C+���&i�����&C��ơ4}�]3$V�$�bP5�u����s��� 	6-)���$�<�k���>�D�=o#-��9��Ų�F#��OQ(�?�P��5E�P)�bu����1�T_i��.� 1��L~F
 ����z����C��TՁ'�Yq�b/���p�k\/	�@�+�f���
mX��ĉ5�
3�j]nc̭�m� ўx���w)Th\Zʃ���nɵֵ,7T�	��, �MN��=[b���&:=��/��6Z9�6��x�/Izt��~Q�Qe Q-d�l��ι�d� ]�J(��B�V:Sy���(��#���e��U`V\��o$�)f��Cչ���'�Xf�=����^�s9꧵����%��j��Df�I/�.E��@��"Y���y�O�DkWl8WyFf���A�s��=L�ALku=�t��QZsYB	VU��s|g� WEIs�tc���Fņ.�
t�9��l����Dį�߾��a��<
҅��� �����V�2�al�6��P�͏��T���׉�@��]6v��z�|��d"�(5�F,C�zKB��pܬ+W�/H_��c,J-7�D4��0C(Nrz,�X�� �>�c|g�B,͇pe�˲�(���Ju2��i������� ���j�V�}�cL	�x���ѻd�r���J��9F	$��N1i�0}�Kg@��7tU��rF ��.�.������^�ck�|�-S��X��9�3�����i,��o�7���zCօP���z�x�^�&�F�;� tA�}�y�o4��ͪc���`��7/��~Y<�v��Ր�"�p�MЭ�fH�2?ߍ�Y�K�P�-���4��Hbأh��\y�ͽ��5���w(�/��%Z��M����z�ݗ�YU��I��R���HJ���e��4��I9���S��7kp��Kη�6Ɲw�1��P�&[OBS��������O�tbs]�5�B���ћa|>mt�0'����;Wz����g_(D��.�_s���vL�0B�?�&Mb��M���w���SR�l�O,��X|w!�Φ8�ո��?$��.h�NÌc*�q�ƚ*�٨sI\F�R�;� ��r��-��iDC��˹`놎���C)��ߴ6���Cla.6mF��@��t�����|�ոf���%iw 1~΄1�[޴�5�Z�W_�M1�1w2H���5X@�u�h�z�u{d���1���Nd�^| ź��}�6��~��&Y���t�߷Z�x����:�Vb��x.�L�,�,N�1��`)t�4jM�+�G�N��Q�qy
gK�5�}G��Í{X�o [��aϹ�������~�~LkQ�4��Ƒ�*|�y�����ת��N��m��~L˦�e�X������ق��v���	��-�t�,Mm�!���s�ORn�	v�;�����+��ҡ`�V\��g���ݱt]��:����8�Lb�-g�%�0��K�@q_uᦂΔ��<$ڡ���d:���Q>�CC��9����}8�֓W ��k����#�W��"t�~�Ң�ډ$~^��c&���aDPk��=�����6c�P��Y.��q4z���	�_.�{U,��<5��ӠK:\�X|epn�p���͢)���e��\A�`��/��mO|�a��|��(ddFhR���Bq���Z	z�2G�{54�Gi�{)���,�H�3TN��p�E�� ����Ni1A��$/���ɯ(��dWa�!�����cqa�	��G#%��7�Hf�e/��y�����"�덞�	����S 9�*��6n懢)/BO�HbI�܏3�OnYy(x�K͛�~��qp]�m�IW�g�m���?o�z艦�,I��fHz7%\���9=6+�\����C��*zV=bk�ȍ�(R��ΰi���X��2� �����v[�b���c�_��{�]B�P���7�Y�-�h:�,M�=]+_��0���6��k�V�W���%qPjq��-%+9�� FFPi���Z3�6�~��T��h�&���B;�3�0�{�ܰA��`�J�ϋ%`k`A��T�ٶ>nt�+ao�e-O�������;��R��*�}3>����[�ƶv��R���S}w}��a�W���i=IA�_����U6��\ΐ��3=�^1@s�=L��˴�)������ǡ=�)Z\bq�ı����hH�m�� pD-���G�+L��Cg|O�(��Q��0���	H2���o�=�!�\�Z�$(�S�Q0�B���5粙�Խ����}��h���{^Q{_uͣ�B��0�O$s:�.%����L�F�~��n-��%�ix0K�@oZ#������ww�P�#Lf������������A�J      �      x���[��ؙ���+���Q�{D�Q�}U�Z5]%ie(�'�'��H^22�I3�i�ۻ��0����X�kòl�5����Lϛ�ֽZ�{�~�s�� �*��RwW1"���~��d5Y�q9�<ot����L�j�_��������g�7]�7������]�4Γ*#�O���;���EZ:"��*sU��*>u�R�U�ҍ�˳R���U9Wt�����Ze|p�L��b/e��R��,N��bwp�H۝p��e9[K�{;a���~�We�����)E�R�ʢ�3������X�|9�"v�,�U*'T��%�H)o��p���,/�}�b�oq�B|�%|W���υ��rxx!JU��%�AO)��?����K��9<�zg����ً���?N�@���Q>�y����t}n�g%�o}��?����T"6�x��@��]�',�����ns�\������h7���7a�/�eڗ��bt��_�ß����_�;��3UdE���!PD�U��y�/\�"D�HT�;�����E�	eo^J'p�j��"��V�H�OOsvH1�P�� 7\�u5 ���̝�؊�$�Th��&�2u��Th�H38<�BG�K@EY�ʼ(�T:ٺ9|P) 'x��j@̯�H>��v�s��4T��Y��n��`{6ex\����Dԗ��>1h �Ӊ�ϧ7  �x�q��?�uQ;���q����*^t^TiX����K��9��	�w^�r���"=���N�i�I���� a�	�AD:�?�!�N�	0 xK� Ӏ�lk(d��[Ǘ��5�q.4k�Q#'��fCx�P�,�TZfNI����$��� ;{����|����z�z�9�K�e���� �|б��W�P=������?��?����/��'b�<})#D���\��e$J'��F�q�γ�y��=I�}b� X8լh�U ~�qp���. 1p/��fz��� h#r��� vr�Ĩ��1c$s��}	�_Q �S�{�$o� 6D.��ƀp�K夥P)2?~��c�E?[�q�C��YJ�*T�|Dl|w�x+#�b�n��-eD�\ú!��&��%�{�=�*����|6��}l�׿�ɶ�ؽ��������������kH���\����&�!�4,�>�C�g�:���Q��6YFr��R9B	%�s����w�b%rcI��)^ ���!�>\��
� r H��U�"w>a�})�zP$��߃����:��ͳ*e�D�j�I*��wmݔ-P�gs�l~G�[��v��1��}��O��7!.��G`"��.��������w�ѯ�_������s��"��>��?+��3%�S���Dz� XYk\��$"	D80'`uYVm@���V��"։�uG��������V�_I�ʛ�W9]�ꪒ�0�:{���t��>])����K��Ђ�T��8�ؒ&@�}��Gf �2�0�IP��D~@��.�D� w`������g��C�ߎ�  ���@�M ��0�"��yP�s���C�(��j����m����w����������G_~���Ͽ��/���?�����������񗿄���s�����h}*���y.�$@�f�J�K�����iߨh��[��%��aK��f���r��Q�`��bycd���I�V~�h�l@\��6�����'(�H����#Ǐ���f�~�[j�Eó���|K��}��� ����rϛ�Sp���á���h8[.n�����O~�/����� 9�,̈�X��X6n���q��6ۓ#�E���D�R����PNآw}�J��2 U�h	
��n�u�72<�7H�`p��.�"�>��s64�Vc�hX��*��?��;�w��2�>�{3Oo[�i�M���<���d���(p}�/�������7?�{���� �-0���j]����r?a��5���+K�r�h����\��fcT� $�/�K�\w��o��Z�3��͑�rC��`�oXXmR<'�k`>j����j��2 �k*�Mޱ�� ,�a�.�$pT�<o� �{w5˖��K�a������¹9��"�}�&�M��@�[���K����@�jM�)���h��릖� wb6������葲��hI2t]5Y}R���h�9�,��=��P��>�M&��,Nn�����T��*�v�<��s�v.��\ݑGH�C$^F@b�����I��Y��Coң^�����.A�"��lA	x��`44T����ƅ��/N�'@ �^#k�šLݨ�am�
�f���Geη�E(�@�&
A���Z�
��.WI����`"���-η�"s�TA\u�6_݆��D��7���|�O������ǖ�z�Ѫ',��?W�# E��R
�b\+�8ݧ8=�������d|����7�R ��oW���;�5:�F������b�j.2�,�a~F%Y�-B�Mvj�n�K�s3G�@]�XG��3��UR�WF���Tx��xu�{�����d֣�����:��Un�����4�P�5���!ݒ�b(��S���Л�_`��%nڰ`����"���&�@Y��ڐX4���>H��� X��js�;���'����P����?�M�8�g��H����W��A�˪0,��Fa(L�k��� �XG�Q�C��,� h�(0�p`������dN�aC��D'P��o��ꍺ��pL��X�K���Q���� E��d��ٶ�Ӕo���wqG�>�\-�FX��0�o�,P=�t>\�{�r���@��`?�)�2p�3��WJ�2 n��1�=�&�(�l�$�&��J-nXibǉd�Ӿڀ�ڨ#�l��\#7�P�M���r��qH�6�J �#Ok�,�Ȍl�[��;�.A�Yj�!�f}��@ I��լ���c���ը����_�����/-�ܨ��	�:%�z-�[d�ͱ �����Q�D 7�;4�Ș:ߣ��1���T"� $?��+�P�M�m�2����A5s��áemԛ����#�{�W�CQY��=*D*��r��߹��~T�bp!�G ��#o�Hór/ R�m�6����W���E�l4���s}�[ ��	a�{
|��3z��B��_i��9���vD]���sV�����/�<�_�4��Ƌ�)�c�l������?h^�W���)��?��Ŷ��	�����gu.�)�$��"Cg���)"�"Z���`b��$��>z�O�R�^�^���l6�tM�%������wA� 4��Y
Vuf9T��e\`�e",ѹ�WdS��2��
^�}�:ϳ]����B@je�������ex�PZ�?�6H�Ѭ��)��b��Ɣ�f��*,=���E�yA@��jW���l5\t+��M���bz�~��.�>�_,�5�[�
�[K �h`�(vk�v���ȣ4�mM��2�1��U%��3�	��Q$8��L��� Xn�|*l��D������`XSDA�����ĮMp/�0�:�\B
O��T븒��>�占 5^���Þ�c/����0�рF�k��"��R�.T��50 �#X�&_��~�w݇Q�c�z_�獆�Y�����d��VQYc6��ǬHCK��h
?�A�O�C_f�Wf���n-�}�3��N��f-d����,��+c���3`E��An0�����ڐ魶�]�,�;|R`$�]6�{��VD��):RŒPzw=�J��I�l�[�uE9գQ���:����~>���t�t���c�j�=�nAq�f�8wI�ܛNs�;O�a��</$!�g��Q����t8���a6�����כ��	��?��T�W�[<�'LLV�q$��ΏY_�#`�:�����k6����R�p8d	�� �	���N#�1`�;�<"4���3`�Q֪��$a���&��p-��q�61e    ��EV�>u���xD�-}-5p��"j���~����t��|�9F��4�~>�{���g�Dcd�|�,���x�uLi�5�?�#t뒍�@�D1Ŵ��u�F�`���e Qv�ȁ����<&�!
�r��Cv���
�q�c�(h� �m�ex+'��;��L ��d܂i���+TW�B��Xc%X��o�Z�xG�H;,g��
W�E�����_⯪7.	��(���A������<Ii�x���U]x��t�q|�^�%Ȑ�u�Q�`)L%�,��E7v��Jd$Ɍ�,B��7ټ �$�9��M��G��7��~_�8C� ��9�xV]����p�>���4��5uj�h��Ea;mD�Pյ�̳<6�I���愪�%|��+Or�s��~����D���~Z����)�s��.�nd�&F��b�1;�ϝ�Fg�b{��
AHY"�$I�22��6�8������y�囨JPX�[I�k�(��\� �x0X�sAS�S��Rҥ�
R� ֝�� /��"�_�T%5�Hnr(��oѱ#��c�%��0��E��b*'�(��9V����������n�]�{�;+�GBL����^T�;�W���`  #N��{�龔k`:�C�����zR+��dq6��EU`�2C��S���A?����HM{��,�[�vj���(
Aԅ�Z�2��A\*�P ����=Ѻ~3Z���L^���TL6U���{к§=h�'���_��B�r �c�պ��w���U��G,ݓ��$:����ƃv�E�Ӓ��@J�r.e��#��&J�[x	'ʾE]�{�Q��#o���3pH�Xp�u%r_Ii�����~�r�y%@'��j��{�h5��z���t� ��B�G0�����"�S���,�U����dR�>-%�[*ݰ�F�[>����ܩ-F:!	���mEk�p�%@����T)[���O���R,������n�j�tS�"	Q�����)��\M�tv�zL���d'�)��$�Ra]6�P�B��B`��Č�8��!�O�ژEz0^���y1hy�u��J�+@F��� X�*��n����)o�B�	Y�:�_���jV��o�u�<�r���I��I0���?r6]����S:��NZ. �3��|?�V���yc�`]�Ζo��p)�Ac��w��!?.���sCڞUX�#�DF�Xo��X������D8�%O�1����ôF�������9Շ�$?!�k�����SC�e�d��[)<oK��B5N��L�g�e_E���w�tsUQ�)����b;ŷo��z�K���x��H,�M��Q[�&l�B��j?R��.lO~f0͊�~��Ռ������������3%�$|�P������wr�+�. 	y�dX�p�5�f/Y '�N&
��7�$�g��hr�}t_A�V�Z�9��N=i��;��!�-��V#2@>�>&g7�� ������� 
ZXbk*��V,n ļ�S�O�{�4����=�*�1��Վ�1�8�1�ٮ�a:��1�6;��*k��o�i�8di'��֠S����JD���kE�t��>���
Е�#bF�2E
�`�Gb�ڇ����Sc����6�W��(����5���(�]�T<�&��O�a����B� �T^bgU�%����`#P��� ���J (
����2�[XYQ����>¨w� ����eXw�Pf3D%���5%�c~�-:�M>&�P�ˁ.�"���k~\�h{���p6�Ԍ,ߛx��y ��c�Ug/�m�|�C6��s�3�ڙ.�T,�â]�SEyT[��6n�h�8x�@�c4�N@줈T�*�4,���9ֽbI$��B�
�S��v:򋧂?4�o��[�c�de��w-=yc�&ӡ��§bXA�C ،)B�6<Z��)\���r�°�`��_���� z5�V�G��i��s ���S�	ha�zcW�o� ?�x#o���˧�����W^y���4LV��U7TDQ��*�*���N�\}��*���M��zb�_��3�1�M̗�U�A�%`�p���6ʉ˝}`���x�F҅��-��|�X�&�7:�O�>�`&	K4IuB�Zo'u������W���n&�G�ؽ��&���rw�ut�)<����yO�T_����\DjW`,�����,j��*/,��2w}Qr���섲�E�V��*�����$	 ~�*?8�S�u�4|��ud_��kW~��Lc���� ��D�JL D\`�"U;��åC�xh����7��ʝ�r���t<��t.��R���r�X��c�������#r������f�w*�a��|�#����܁�@]�\a��Jmڍ4:��(�.�oYov�f�WN�yV�44c�}t���������t�ۈ�!�(�(�@7�%�T��;��(V�������?���|o|P��f��h5�n�G 9�`z��*���Cs���bS��c
V?a��l4I��
����N�W�B�Ћ���'T-��Hv�k�X��a�ןE"��>xޱ}�Е3�A�a����d�G�;1��^x�opZ��Z�����P�G�r��TG��{`�[5�]�3��j0���C�@p���.?��%����("�0H����� �q
dnt*0�'N��ʶ����E�]鸮��2P��)x���WpC�n��j@2��V~�������~ @�ק \aݏ�訠��3�.�c8�O<G����F'"l��3�:��)�Ty��֛.��~2��Ū�������5rh�_@�PW�KR�����;4�����w�!�X17l����|�0O���L`�'���:�Կ'c��e������1�xRX��� E�)mZ=#w�V�h99au7�^�Xwl+�@nP�V~�V�q�KV���P��0�wX[���j_C�_4��@��/�:�I �l8]vDv}�%�1j���,���yE�akc�j0Q�����|=�l,�)����jC�ǃ�	��k)|�=�w�.r�����;[��q�� >�CP����������#���ͫ?�W�J=jC�DF�S)&�V,��@�� |$��}b��ŏ@Ł*B��*��H��#	ڮ+ޏ�G�B��}� =^�)������]����Ȧ�����q� ���bщ��ן�%�lc�]� ��T�jk� �q�k����b�|8��1ٱ!m��bcd]`��A�w�l�����E_�Q�Azys ��$.�Y8�;i��{#�J�k��������:^�S�h,�7X	3���D�6���x�)NU(�گ�g�wbT�zh���0�������n���N8p�^w�@}]��g�fTPť�|UȽ�[Is��1��8NDj)���aG��5F��&�3&��5VA���������`KA��l��쫎����{��h����R�-��S��	��uB���V)����J9<���ҽL�PGZ��M�8}O�w��Xh�mڈ���w[|eb}>��Ļ�Bo4�^I?=^��e]�8������_������x�34�e������k�j���:�R��h�)��x��4���A���<�.��k����I�����p�Y)v��(|r���� O_�u �~�M�A�J �v��h	�U�(��*[:�_Բ_NF��g+U7���H}�"T��� �l������!;�d{�eI���p4�1�^���{�l��oG�W�If�q�M���A>σ�ɮZ3�L����ݴݝ�ޞ� ��%�!����4^қ�&"�E�x�����
_��y\��}*z����D��*�k.�`iu����ZP�$���a�n�,W����)��{L�jC��#� �h��N�ږX����& �� �Q�x���vyUD��!��jѣ�����q' d� I�U\����øg��M���M�)��
��p�� 
��    >{���C�,3y4��g�e.��o��5�X� ��
���$����+�7,}`�Ζ �=$�f޶O��̶qOPF_^Ż6�c���K�i�� l��6��HcC���6
�c� `���z\���[�X^H�܂BOaҞOP�d3���� )y-� t͠�V�1eo����
{�h�|ه��@x�)������v*zV؋:���ET�yF����� �Rȳ2\Fg7�����GE3`����͇j��✦V��;�q�8L3�pJ��MF�^��
D�_-JlR)����=�_�@�U��}H9�)3z���cUt�����=�	}�9f)�sPѠ ��ƭ:��|�Sy�bWiW���ȱZx������f�<Tdo3Ҭ�I~b�QL���YS]������4�r�p�AR�W�$�wvU��0;��0�k�-]_!pV#h^�i�[qZ���;M�e79�YX���3�����'��&��N���y�}h�Sz�����7�J�Vث\W��z"3@c]�d�z���u/_����b�<,��^�[��q��u���M���3�*J�t݃�Y<E_&��f���A8���j��f�:��H��I.4hf�Ow�tG
�(bs'%M<�w�c��U�(��֑�j�!�0;�W{��x��=*�ipC��e1�gy�e���y����7�f�W��F����1KǼe���t_���}5!��.�^�%��?�Q������§�Cb���H����Vr���xk�Aͬx�gT!��*06�ɓ�Ӣ?��<�p>ݲ�fۓ(�ŸCN�����O�4��~o��q7q�x�xX�������b��LǋG��ܻ����j�=�2�M9C����]��
�-�j}�=��qՓ�z���i��_Db[D	bmֵ��SਓZe+��A��������ӗZ�Z������qjF�U�q�v��Rx����5[�rksؕ��ey٣��&66�ĦW�ؗ+љ��!l�N����-��4V_�ƸSe@JC&]��Ct���+zC)w.��1��S7�M�գ��%�ɄD3��"��Lڳ7��)�B��zx{�B�3Z � �Ju���۲ky�|l��ׁw'�I �z[���l���)v��4�����n�O}�1�Q%��`/Ê��#��������SG��,�|�u�T$b��[���;�m��c����D�D8��a۴�t*�
�_V�i�妅�9�|�a��ۣhה���!1K[����\�X$~��ձҋq�9�j��T��
[�jxj��E�����v[��\z�k�K>���f�A��YO�Κ��$����e�^�t������9�euVGw�����j��'��\�?�:�4~ڤcn;@��l��������@7<Z%�uV�e��e���Պ�i��Hqӿ]��	~���znB:�Ӧ�/��5���Ь�����L�k��o  ��J����g��QC/�%��� )������b9\-{\i}��R^J J���3ݼ���qQ�NwE4�ܭR���_�����*W����kr�	֚q!�Ii����@O����}���D2�!پ��D�������i�GU���X��V�.oz{c#��{I4�j�A.�YdV���%��'�;G}eJ���{��2?s�?V�*ॗ���4W�/����e���Fmp[d~
�����3t���o��`5`��x"����1����cJ(7�H�ڰ&�I�d�錚,�pN=�9���"�D?#��{�&%Z 818��&��@&:��v.���ӱ��F��z;��o������Ͳ&�l]�kP��sf]��Oc��h1���.���)_~�����i��Y�ik�ܓ\���e������X��w�%���h0�N�6�M��,]���7 5�#+Ć/���z�D^)�	�@Z3rk+�c�Z�z���t������x끜�L;��vU�I�u���פQ�`*�%;Zt2���7W���"��Cǯ�J���P(RL���=n�l6�v����*3��3=D�!�'2��
B��#����n�TF�(�m�bϕ�GX���r�@-�F�r
�V���g)-3���Cx���-x��2WG1|����ӊi*�74C�=d5a-�.��hfDV�U�R@�c�3_�s���߄�c�㖒��lź�Μ��*nnBHvB�>{d���˹�F4ng+x`wn��Z���p��������W�:�0�r���P��F��<�jm�%Y{h:61�N-�����$�>����'��t�zr̴���V��ۯ��I��K�v��Df��*	��59u7
Պ�42mu�xW���Y]T���wl�m]|�~���0B��v�}60NB��~�)��^R���R�aUv(�Mz�
GK̰2ݿYjӖ����=e�@p�Kk;^��<���M�Z���|UR���}�u��h���g���7�T���J%*�Ug�Z�tVԨ�Mjk�l5T9��LbzzSbMx���!R��Op�Qz�a��
���6� ?[0���8S�3C�����A>�s����rŨ��EL���}H
�+�A|�
��3���[�ݦ��1��_z���o��*����&n<��)Z4��]�tj�y�U��u}2���ڏC
�148�-j���n�?��+�(�M����R$'�����#�k���If��|���$6x/��_�@�#�ݥ�f��;矤���蹇	f��7Z�i�sV�ǅ8ͪ"�M��N'is��F�n����=<Y:���I3`�A����5�Kpx~��dq[�πV��b�,���~����;�[�6h���3����wx����c���Z����T������1c
����e67��P�CJ�)uס���C� �Y���C7�Pk�VL�6_a�U��hj�bٞ��?j�`2��8�y�� �Efۺ�Ⱦ���n_�Ѹ���� ��g��7NF�������<���3�S���3N�=�+�՜��5rHT맣9V1.�šU�o��;OER��"�|Bw�eAT]��3}�Gz�Y3���^B{���oO�#H��4��<�TH̦�*��Q�����q�.�CiMF�Z�ſ����k�)�N��C��l�D��W�hN�вK;������ķ2���]_��h{[j��+o������덗�y2$E��>u����w��������۳*	$�x��-y�|iJS��l996`��ykp�$cZ�7:���S�Tg˯A;)`ڲ4J�T���^�bI�^�ŏDm�Gh�Y�|%YiV�͆+���5y������8����Ӏ�:�f���4a[N��q��6��ΒYᮙ��׭�u��Z��=,�����E�{p���l�i�JÙP=��/K��^�m���D5�op���q,I�/ْ���L2��8&�~�h��#x�jm��*O6�����7} ZT��~	R��e�㌝ �$ZO�
d�с\�c��^�r�`K/�40a%A'�Q��-��6��e޹��ä�%x2����)7s)�G�ި=��ݔ��=0�(]^mE���B��o�h&ﴈ��4�{(j<\z=ZZ_&֯�?��f~��uq��J kѢ����Փ&z��셯3/vYw'�r�8�q��۸�vek���[Ƶ��P�'�S\��U�D?0κ5�C�7әQ֪+��-���{Z)�Ԯ:0~�י��m���t%.O��~=B�6���^z�K�&���&N�>�5��=���~6� �y"���zنuO
�t���,���kSs������֓_�I���:.�� 8K�4�A�z�{�v��c��M�$|��W�z��glq�W��	�{q3N����M*5��j�Xuˆ펮z�#;?��%���yv�=D!���9�>�rz5�5����z̞��������Ҫ;%	�*����aM�I��5tyX@���u�W�k�z-��p��25ןe(?�_����?PG2���B���_������o�    �,;pc���Xj��!�\���Z%fd�]��y�N)V�Y��=�c3����&*�9��L�љ��u�e�Lbk�J�C�J��1��k�y�W�(6��x�GF!�J�����a��q�vwX�����s����D'>|<��-��`^,��qխ��������pL�K��� V�D�@��iJ��,���o�aR!XVP�ͨAԷz��~f^�	Ӽ���)� Mlu�p��$3�%�)P)�7c$UB��ݱ.�*%��|����Xc�#�Jn��Y�XcѸ��m�ֵ$V�xc����[�t�B�κz�ڍc}�z�D&�@b���´4�S-��y��a�oPS���7�)[1�fӞ�2N��}m�{�-��N��$r�^/���d��T����'j�X�����dl�j���FQ2��RZ~�"��2���к#�dԊ�IKǢu�D���I6����t�����Xιh�
%�ǃ!+R�π{H��k���ԉc�� z}-nnb�8z �J�>?KS쓳�t;5g*ӌ��i��y/�DH]��;o4�4�^r��ak���ɭ�\�^*'"�F	��~ f�i���d8�ןcf�y�~KF�-�Vz�Q�L���ͳ(]�NK�^�i�nUw�J���l��&׭�T��v�"c����7�|��bw�
r�DW�cNL�\l����v6DOih��8�B4GBk������?�}�@�Q�R	6e�L-H�]D���,��E,'���lX������,�t��5o%Uz_�i9�6�(��%�X�����)��i�@s�E�װb>� c�M5)��b��扥@��y�b�Z�ғ��0�=�g��va���E���n*�A6R6��;S:m]���ܞ���]m%�^>�Q�b;M��kr��|T�,�PR�|�i*�i!�Ӫ��5�O���Ҷ=׭޲#���N���پFzpݤ�{D��p��p���R�b�{�=RγC��(��EOR_.@��nfڴ��ϥ�� �%P�]ɅX�gi��7v�4�j��eH� �����@�󴩟j�MI�I5iB�u+�֥:�D"�m��]N�5�Ȁ�D�岊�>��x5f��Z�??�_�U��`��$۸\B&J]EV� ^Zk,�+���9T�%I��A��Qy��8���M)���5�N�C�r�<=}�r����]n�ku��(6u�����E�a�*�����cխOd�};��� �\6�<�Hf�-� Xb0�p'M�M�źd�ѣ�^NLNL���4��
��ЈYLC9�J�#]9ff���z;U)x�!����9�8�W7b�|�jW��f���pg� o��J�I�0�N5=:��#��Bѫ�}Nv35�r�&Ԣeu]��Ҝ޴�+i�e�CO� ����M'�*���0d���@�`Jcx� �w4���;M-�4���#����?�nE�#0���q�>^�M��Pn������~������W����?����������bI��Ȑ��cI���`���Zb��8���q�,	��&���j�'�;�i��3
���yS$�1��}.���ga�M�O��-m�BL%m� ��h�;x�b^֐�-��J����z��8��/��נH�����,�f$@���7L���'��Z�z�A���4+X,��&(bFI��e (��e	�w�gz"����b!"�E�5\%B\HO�I�ףDMb � ���Fn�y�<�ե�-5��7�)f{\G�������P���������W���}��|��������쫿���~������������s)s(��Y�9��u� ����n��:�l&B��Q
ͯNG*zU�DY
��dk)�k�l�!\*n���uR��AQg]m��C�^1��&�u�eFj%H��=�hr��墙W�rkS#o+)�qj�pj�,y4�e�S��Zr
�ܰ���*ߗ�sΛ<ԹZ�K*��-=y#��j]W^e��v�������5�3oy���[=#�/_!<_��i��P<��7*v� ..���W���p�O�\}����s�<ʀ���d�aa�ϟ�|��s ��ط�7x�V�ui|�����ZT�HJ�ӕ�8� �f�����Z����3݈ŗ�������~xM�'KhL��GzUya���GS�5��n|�2A0�%%.���`Ꮮ&�)��(6�>@�htVgw��4*2�.����c��(s3-�DFj�u�7bPq�m�?��i8�/�b�&:u6���V����8S��\�����4�F%šE8˫ug4P3΍X�X1���LVk�	�xS�M
��\ð�?��b7��5�<J\,���r���-�o���y\Lk�i��@�~�r���!��`�k�a78�ѓ7�J����+��Y#��M��so"��"�03
�4�[((�BG�[�=��v��z%��e���_)���u��_a>�bH��A���SoTQg���j;���#��p�����׿H�j���*�!��Ë7�6��CeX:�W��z���vH^��N���$g��O�޲���o�C4���p�̀G��&Ϟ�����"6_�,�:ڦ�R�j�(*g�q,��~����"!Û��-Sq�JT���A{R�<܄�(��>n� �]p��RxN�u�H���#6�S��2p.EB�U@۔���;N��I7�~¢���TGtT����͛J�,x�>^P�T|�����%�\NO�OL�m��r1�^��V�@x�ޗW��K6�q���F�k��&�^V�ϡ�N��Β���S�_���)���V8�pER?�s��aQ��!�&�����e���Է��gsY~0A.{"��!#�T*�ɮ�٦ K8���.x�T3����,�1������`��:S�9n/�*�`�e�`}� �T,�f3w��p�Ә`#>��^����y�.B��*
]/QG�4����z�8V�3ڜ8j��R���Ҋ��A�@��!�oZFJmd��A��,�'�A{�h�'u���Nہ5䛶�7�1E9���ْ��f�(i)�*o���v�|�.��U�̇���"���g����v�7��Ϟh�ԟ4�Ŧ��5:{�&�K*M٩�|��ƞ��$���V�P�H�k7�)b%`3�M��؀O��}m�o�R�C�4fI�Q/�Z&3'��[]D��1�����i㉎�����&TD�qm
r~��O�|u�9H���%�;��č�i��"�����T��@����w��X����͂[7>l����닭�;�Ǯ����AeI=�H�4�4���	B�v8��o_p�ץ���PE�#rR��t��5����H9��u�����dGqH̸��B_�q�9�łDd���PCKj4K��k�١����mrz{�P-*��4ʸ19m�!7e0G0�+е;�.�z�ǙY���,ѓO�($َ��hx�5���.c�ÁM^�R�N�n��Zf]{��QG"��V�4��:��+���Ii��^�N"#ɶ�ڭ(�U���ۅ�o� b�%A6Н���#����RV]7CS�z���ɼ}�=��Ku����I�g*b��<T��eq�D�G�tv�7ן�MVԺ�cZ�p2~�v@��=;Z����2��*ML |����9Z�s�/�Aܖ�v�� ��mӳ8~3{9/<O�\ڋ�O�������������J�7��YS⻅�O�lG�M��bE�v���7�gר��C�
���V���פ+"��Q%�5&4����T
:�ϙ�V���fB[��іPh)QW#~��6�<�F#$XA����q���a�n�>�W�_ͥ7:Pg]r��3N�~2��z�����H�m�K:�� 0�� ��O%�ʿz���۫�^��������[��/�P��&ܫ!�8�[!Ö��{�~$��A˜���:���?��x⧒�����Bθ̍j� ɰ���=�a���%��6�u�l�,�U@����R�]�ٽz2�*xj 
������Md��<ݘ^��M�"�L�e��'|2�N��a3����Ph$t�6���Ug2�l����ltF�Q*n�&��DO�/�#��U���u�鄳Aˑ �  �06�D����'�#��&�@�}�h�Y�.�jፎ�Sk�y�w�S���:#қ�O�X\����(A�<3K��tR���A���'==�"�(a�|����i�Hc(��k��%���!�0;:�avk��W9�4��a9%V�h�|7]1�y��rL��	[�rH�L͚-�M(�U�hY��Ml�Ŋ����QZ١Y�e�M�sy�ԜX����̀��N�q�$��(r�Z9�N�A(��S聁�Tښ�T]�T�TP��������f�+���5T_��{ԧ.�j����f��|���׿	��@��Cą�����^�D{Ζ����Y,������7hc��\�]�ԳB_��Z$��o^�Q��a@�߮�k)2�cn]Μ��h�D�e �PA8���	"�j�����p%�L�x����;t�O��vQ�I��Ѩ<6��)�xX� �&�\��܋�[�ǳhfi8Zш����x.�$kɭ�ީ2K@��[��qq!�`t�E�NJ�_�:BT?4`���e�k����9.5�b�-׻�1�U0q=W��X���3@J�������і��/p*��d����1�� {l�Ʋ�i�p�/}�\�Tg?�\;��wi�y�7u�J!bD3�O'�%�ԎW6��M�w�����}�=�]��J8�v���S �$���"��6:4��"�$lwC�S��^�C�S2wYQ�dYR�YN#�u�E���c|5$8_�:�v*��*����/X������sh�ȡ�;��gbQV����GZ+=��#��+�.�Zc��]�8�N���-
����P�no�k�1q@Q`4��at��wT0o'��������+�W�7��I4Y&�Y�U�ܭn����g�ǟ���~�g����?�	����w��g�Fb�an�}�l$�'�M���)�a_FbR��!�MA���h�
pt��yG��C�o���q,�29^>��BQڍ�=	���T�W�'�PǛ���=2��W��A]Rۮ��y�.��܄s�̻���H)��;a��ތV6�V�(���Ii:�	Q���@DoPi��UXaP{�6�@c�^�Ӻ�f�Q��$Il�����}�;�h-��i�����5�l�j=�����t8�l�h����O���s��� *��9�u����H�*��f����L-,|9m�r���%�8%6�A'�	߫NK6𱽖�~r���(�nj���=ֹ�¥x�	�%���Y���|&8�頥�Q4X�>��5L�u��X�v
���I����F�H����0������s�d����ڣ+O�%�E~-�a�Tۨ�+�Vu#O"yM2��b�Ī��Jz�	9�բ�wU����pҭU��?��HT���<�_�A�JW\d!�$=�$X��4΂�&C�v@c@���7���To���|�5��\T�8i�Ӗ��-�I��#.q^E�ՁU����.���0u*�B��[��y��	�vp�{���Z��N���f�`��hZ�\��������K�a���v��+l3��z*R\W↍?҄�Tʉ=���W傹�'��u[��c�s���\��2֣��O��f����yt�@�~9�M:��������Ͽ��_�ǿ��/��Ͽ���(	nB�T�݆Њ�7)ݎ�@��G���oc?��z��
��%�OK��8��-�Nc�6mu
F^��*X��M���v�^�$�H��S~,��)�s�uzV��Y�Iq��h�$H��$�M�+zμP��0��M�|s:��yEՒ��h�2�x����a�U��ˊ�!�h-Pk4����i�զ�s(���L�M�Q��GJ�Ѵ��?F��3�:�$�e4�>����5��j�SmF(奿��Mg�҈��-o���P���횘�Ǣ��z�&�����|g�E�v���%_�-����,�fv`z7�^�Z4Z�"�>1��,0��YL�&�3��S�x�bTݺi�R-8F��T��P�?Mz[n�=���;����N�\S�Eيʯݑ�kc0����=¥X���F6�{��ĖF�p:Q����fM��O�b�O6��ڮ&˾��z�,��K���P��ä�&4�)uݨp}�#�G�0��J7�F�|�B�>g�55��*r�c��Z�'D�Bq�[��;N��Uv�;%���a��\�>�CNRc�����z�]sFZ��kI@˲l��Q�n�z����l�!�.��X/M��=H�@�4�5����n��	N�E}�T������4y��V-[�S�O�w*�<�nV�ifT4z�C��f�	��z��7mC�w�����.D��x���x^��$�/���M�[�x(���Z-|�
̇����6_�؊�9�U���X����}��N�G>WCb��p��3,�ɲ���e�qE$��]��F�ru�8��x��Z"�ۂ[��f[<h<`����ljԢ�J,��3�����D�� �N����kS�%��=��~6����k�J��h����1�NF~ҝ�e�G΋ʱ+�AP��� N��'��ln�@��:���1����~�ޖ��Z<��m������Q�σZ_G�N���S`n,菱�D�.��I����o	��H��ҁ���c�|[�C�7�e�������]�;�Cb�����X�`���L��kd@��_�P�`R*��OSszA�f���Ti���6L����$L܁����NS9ީ��cMz��NdV�s��q	(d�S˪4��^�{.��[ŸMI�k�\z�%m���:ZV=��u���ן���̾�X]�`/���S��0��c�w��H�/�§y�Dv��ݐP���i��D�� c�6��y�V�U��|�O�X��s�X�k��Bz6�U�=h��D�q�c�;�r���r���ȋ~�ޠ��0����]����[گc�E��!��)���\Ck�f�Z|k�8�+���hfsJ��(s�����#�"*��)����o��o��ڈ�3      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x���Kn�0@�q�
6���~?{-�8��TPQ(I`�R�t�G��#]�e���z ο��mC�@5N���b�j�:��,J���y(���t���I��h�#<Y�����F!2�����K��������P��h��}H�v�ƶTT�N��PR��it��_���%��y��]�
��lW�+������ M��8�&�Q�����jmYj      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   b   x���@0 ���-"Ւ�F����A��߽gB��)w-��|!�W�Gy����-1������l���&P�Mt�lr�L'9�Ř
!~i �      �      x������ � �             x������ � �            x������ � �            x������ � �      �      x������ � �      �   >   x�Kε4�L�ɩ204H���4�((/K3���L�XTU� A���IQr�E�A�	W� �         Z  x��TɎ�6=����ii�\�90���	܃�E�d�6�zz� �Jm�W�s�O�z�W�ˤYf�2�e&SY�,�`���� ��+U�\IN�B���1*��VhA�&���+�Z�.��
 e�+N�J�L�"�V��(_ˢ(T��Jc���(j׻i���~PE���)-�F�,���Tk�4c�D����b% �RF12W���%�4ȍ��
4`��%TQ�y)ʆZ��P���[��3��]�K�Y��*j���h܈5����yAA�D����(l*A�4����ҰpE�~[�����-׍�2����m���(�1
�a��h�g!�9��|����4�������䆞4�Z�d�c{\�[|x�1���D4.��G56�G2����'.��`��>���5��m!�|�p?���0����>k�B��@\O��~��fI[�@C���i�f3z��qc7�Ř��v������C�>�\������6VJ�'eo�j��l�l�h�}��ۅ��������	�Ct3�N��Y��&��t�H��%�d��O���᧥���I����n��?�,�b��`��f�{OO̾R{ڈ��"�C�������=��l�����>G���s���90C{�]��˛��3���g�7�.^�����&��Zן!)DL��?O�d���N[l���9ao�&��?�	!�"�{[?�c�M���Z6��,�9�w㴔�n:<mi=k�5�p����tZ��>z�\��MT���Kv�ټ��!�$���*r1屪��u����Y�|�3��?��z\\����f?%[x�+;a����?:��K�LϹz�A.�R2���y�����e9�      �   �   x��]��@�����Z������}Al݌����|�3���>�\�sx@�Q���G8D$al ����%*�S�U�rზ��%o�v���A �ȯ��>,�ʡr�7�A�����V\�i�}~fÿ���ףn�]��W�װ��ݎ�,��6�O����)��x4�$��ۘu��Ih)��4�M$Ra߆���H�|��^Z�L�      �   �  x���kn�0���)z����g���ѡH�r9vC0�wvI��⯈E�����K���l��]$R�����n����Iȓ����7�I��I���D���I�����TQ!EGN��I�CH�dC�j�)���*+]ÿm$�䙮a��F����`<�)!:�c�-H��&)��*B�M��K*�XDs�(�`fNR����Y&�ҴZc��$��E�pQ�:(B�"h��*���	Z�?��I���ض{'M[��:���4�^(�E�J��' ����IL��}K�l���W¶{���6�h4�z42�0��I��V��i�>�#��� /RY|!��M�ݨ$ݮ�"H�:I.���
��Y��
���*½`����ar��xW��4�.�芐Kd�qH��~�A�����\0u}D���(%��.2�9H�����m\2��E�����n�J~�(�'A:%v�Т�Egt9no�_� �2V�@p�ꛊ�"mEI9�|���Љ�      �      x������ � �      �      x������ � �      �   �  x�uVY��6��N�h�n�9K��&��S�ly2�ӧd�$z�!�&�k�5����|Z7Y���>�R�j�r���ں�4a�67߉�Qj��0l9������C���'�%��,�e]������iT�k^M�݆�B��zJi�Q���z��A�{{ד��R�yt��h*��`pG��ZI�j��hv)M�\e}_/��<���q:n�����L�r�Z)�dP�2T���l߅e�������M��x7�S5����p�౴�B��T������
\�)<����:�ǹ=�M*j3	����q��Y���Q�����l��i�r�/泜t^��A��83��2���pܠI3��l���fK�0��2����ż^��h�u���pQzm e8O}h�@���&�D��;�S~_���c�����F�R��^m�qC��R��9ǩ��|��*����s����2<�{Xj0�l;HJU5f��>g�&���r���f�����E�C4%Xf�ϑ2눺?#@by��7f��r8�m�Fx<�}s�뫿��C��s�����:%W�d�ܲ�����|o"�?3�l"~��� �6˗e�]W}�kG9����8F���ŷ��I� �w�*�Q�%���s�k�s{ N�q9-�|kZ����s��z�R3B�1�ʐ�]�%N���s��b9�r�O����y���Q��ꉆ��Y-���}���i��&zY��6��m�/�O0�k�F�6�u����[P���1�Rt_c�#�7Q|N�����b�:���L���|j���C�z+1S݇s�'J��.�����/���g�f�Z9��6Ik����V�&��ۜ�:��O+�=�ߖ����[��M��zc��D��TPL�f������a�XA��(ߢ����;t�8��9>����ҍe���nKj�f��|h-���~?>|����������e}�ħLq��#�Z��J�:,1j��&��DG�K��P�b$sw�	WX�!=�ǋ���m��^���I}C��G�R��e�~���B��y{�����
�ؑ}�C֩lŋG/5�¶檘\�>G͗��3��
FPk�M�ғF�[�5 �<���
�bx�9n�����=���Ŀp�h���@x�+��I$�.9���M��vB��@N0�S礫 K� ��/��G'�h��4����Ɵ�T�P�12$�ǧi������      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     
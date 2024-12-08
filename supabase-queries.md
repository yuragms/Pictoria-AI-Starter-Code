## Models Table

```sql
CREATE TYPE public.training_status AS ENUM(
  'starting',
  'processing',
  'succeeded',
  'failed',
  'canceled'
);

CREATE TYPE public.gender AS ENUM(
  'man',
  'women'
);

CREATE TABLE
  public.models (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    user_id UUID NULL DEFAULT auth.uid (),
    model_id TEXT NULL DEFAULT ''::TEXT,
    model_name TEXT NULL DEFAULT ''::TEXT,
    trigger_word TEXT NULL DEFAULT ''::TEXT,
    VERSION TEXT NULL DEFAULT ''::TEXT,
    training_status public.training_status NULL,
    training_steps NUMERIC NULL DEFAULT '0'::NUMERIC,
    training_time TEXT NULL,
    gender public.gender NULL DEFAULT 'male'::gender,
    training_id TEXT NULL,
    CONSTRAINT models_pkey PRIMARY KEY (id),
    CONSTRAINT models_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id)
  ) TABLESPACE pg_default;
```

## Generated Images Table

```sql
CREATE TABLE
  public.generated_images (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    user_id UUID NULL DEFAULT auth.uid (),
    model TEXT NULL DEFAULT ''::TEXT,
    image_name TEXT NULL,
    prompt TEXT NULL,
    guidance NUMERIC NULL,
    num_inference_steps NUMERIC NULL,
    output_format TEXT NULL,
    WIDTH NUMERIC NULL,
    HEIGHT NUMERIC NULL,
    aspect_ratio TEXT NULL,
    CONSTRAINT generated_images_pkey PRIMARY KEY (id),
    CONSTRAINT generated_images_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id)
  ) TABLESPACE pg_default;
```

## Credits Table

```sql
CREATE TABLE
  public.credits (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    user_id UUID NULL DEFAULT auth.uid (),
    image_generation_count NUMERIC NULL DEFAULT '0'::NUMERIC,
    model_training_count NUMERIC NULL DEFAULT '0'::NUMERIC,
    max_image_generation_count NUMERIC NULL DEFAULT '0'::NUMERIC,
    max_model_training_count NUMERIC NULL DEFAULT '0'::NUMERIC,
    CONSTRAINT credits_pkey PRIMARY KEY (id),
    CONSTRAINT credits_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
  ) TABLESPACE pg_default;
```

## Handle New User Function

```sql
begin
insert into
  public.users (id, full_name)
values
  (new.id, new.raw_user_meta_data ->> 'full_name');
-- Insert a new row into the credits table
insert into
  public.credits (
    user_id,
    image_generation_count,
    model_training_count
  )
values
  (new.id, 0, 0);

return new;

end;
```

## Decrease Credits Function

```sql
BEGIN
    -- Decrease the image_generation_count by 1 for the user_id in credits table
    UPDATE public.credits
    SET image_generation_count = image_generation_count - 1
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;
```

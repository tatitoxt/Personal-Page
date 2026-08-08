-- Orkelya Autonomous Content Engine Database Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Enum types
CREATE TYPE content_pillar AS ENUM (
    'AUTOMATION_DEMOS',
    'BEFORE_VS_AFTER',
    'WHAT_I_WOULD_AUTOMATE',
    'BUILDING_ORKELYA',
    'BUSINESS_OPERATIONS',
    'AI_EDUCATION',
    'OPINION_CONTRARIAN',
    'SALES_BUSINESS',
    'AI_SOFTWARE_DISCOVERY',
    'ARCHITECTURE_VISUALS',
    'MINI_CASE_STUDY',
    'CONTENT_ABOUT_CONTENT'
);

CREATE TYPE content_format AS ENUM (
    'VIDEO_SHORT',
    'VIDEO_DEMO',
    'CAROUSEL',
    'STATIC_VISUAL',
    'DIAGRAM',
    'INFOGRAPHIC',
    'TEXT_POST',
    'THREAD',
    'BUILD_IN_PUBLIC_POST',
    'CASE_STUDY',
    'MULTI_FORMAT'
);

CREATE TYPE post_status AS ENUM (
    'IDEA',
    'SCORED',
    'ROUTED',
    'SCRIPTED',
    'PRODUCING',
    'QA_PENDING',
    'APPROVED',
    'REJECTED',
    'SCHEDULED',
    'PUBLISHING',
    'PUBLISHED',
    'FAILED'
);

-- Core tables
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_type VARCHAR(50) NOT NULL, -- reddit, github, rss, internal_signal
    title TEXT NOT NULL,
    url TEXT,
    raw_content TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic TEXT NOT NULL,
    velocity_score FLOAT DEFAULT 0.0,
    relevance_score FLOAT DEFAULT 0.0,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ideas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
    topic TEXT NOT NULL,
    angle TEXT NOT NULL,
    hook TEXT NOT NULL,
    pillar content_pillar NOT NULL,
    embedding vector(1536), -- OpenAI / HuggingFace embedding vector for deduplication
    status post_status DEFAULT 'IDEA',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS idea_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idea_id UUID UNIQUE REFERENCES ideas(id) ON DELETE CASCADE,
    relevance FLOAT NOT NULL,
    hook_strength FLOAT NOT NULL,
    originality FLOAT NOT NULL,
    visual_potential FLOAT NOT NULL,
    conversion_potential FLOAT NOT NULL,
    feasibility FLOAT NOT NULL,
    overall_score FLOAT NOT NULL,
    score_breakdown JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idea_id UUID UNIQUE REFERENCES ideas(id) ON DELETE CASCADE,
    selected_format content_format NOT NULL,
    target_platforms TEXT[] NOT NULL,
    status post_status DEFAULT 'ROUTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES content_projects(id) ON DELETE CASCADE,
    hook_text TEXT NOT NULL,
    body_text TEXT NOT NULL,
    visual_directions TEXT,
    voiceover_script TEXT,
    cta_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visual_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES content_projects(id) ON DELETE CASCADE,
    asset_type VARCHAR(50) NOT NULL, -- video, carousel_pdf, diagram_svg, static_png
    file_path TEXT NOT NULL,
    file_size_bytes BIGINT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS publishing_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES content_projects(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- instagram, linkedin, tiktok, x, youtube
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    published_time TIMESTAMP WITH TIME ZONE,
    status post_status DEFAULT 'SCHEDULED',
    external_post_id TEXT,
    idempotency_key TEXT UNIQUE NOT NULL,
    error_log TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publishing_job_id UUID REFERENCES publishing_jobs(id) ON DELETE CASCADE,
    snapshot_interval VARCHAR(20) NOT NULL, -- 1h, 24h, 72h, 7d
    views INT DEFAULT 0,
    reach INT DEFAULT 0,
    shares INT DEFAULT 0,
    saves INT DEFAULT 0,
    comments INT DEFAULT 0,
    clicks INT DEFAULT 0,
    dms_triggered INT DEFAULT 0,
    leads_generated INT DEFAULT 0,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_post_id UUID REFERENCES publishing_jobs(id) ON DELETE SET NULL,
    platform VARCHAR(50) NOT NULL,
    username TEXT,
    intent_level VARCHAR(20) DEFAULT 'WARM', -- COLD, WARM, QUALIFIED, CLIENT
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

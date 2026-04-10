import os
import databases
import sqlalchemy
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./portfolio.db")

database = databases.Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

projects_table = sqlalchemy.Table(
    "projects",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("title", sqlalchemy.String(200), nullable=False),
    sqlalchemy.Column("description", sqlalchemy.Text),
    sqlalchemy.Column("category", sqlalchemy.String(50)),
    sqlalchemy.Column("tech", sqlalchemy.JSON),
    sqlalchemy.Column("github", sqlalchemy.String(300)),
    sqlalchemy.Column("live", sqlalchemy.String(300)),
    sqlalchemy.Column("image_url", sqlalchemy.String(300)),
    sqlalchemy.Column("featured", sqlalchemy.Boolean, default=False),
    sqlalchemy.Column("order", sqlalchemy.Integer, default=0),
)

skills_table = sqlalchemy.Table(
    "skills",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("category_id", sqlalchemy.String(50)),
    sqlalchemy.Column("category_label", sqlalchemy.String(100)),
    sqlalchemy.Column("category_icon", sqlalchemy.String(10)),
    sqlalchemy.Column("name", sqlalchemy.String(100), nullable=False),
    sqlalchemy.Column("level", sqlalchemy.Integer),
)

experience_table = sqlalchemy.Table(
    "experience",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("type", sqlalchemy.String(50)),
    sqlalchemy.Column("title", sqlalchemy.String(200)),
    sqlalchemy.Column("institution", sqlalchemy.String(200)),
    sqlalchemy.Column("period", sqlalchemy.String(50)),
    sqlalchemy.Column("description", sqlalchemy.Text),
)

messages_table = sqlalchemy.Table(
    "messages",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String(100), nullable=False),
    sqlalchemy.Column("email", sqlalchemy.String(200), nullable=False),
    sqlalchemy.Column("message", sqlalchemy.Text, nullable=False),
    sqlalchemy.Column(
        "created_at",
        sqlalchemy.DateTime,
        server_default=sqlalchemy.func.now(),
    ),
)

engine = sqlalchemy.create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)


def create_tables():
    metadata.create_all(engine)

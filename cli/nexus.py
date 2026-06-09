import click
from dotenv import load_dotenv

load_dotenv()


@click.group()
def main() -> None:
    """Nexus Seed — personal sovereign stack CLI."""


@main.command()
def validate() -> None:
    """Check schema integrity and connector health."""
    click.echo("Validating schemas...")
    from schemas import CareTeam, Document, Contact  # noqa: F401
    click.echo("  schemas OK")

    click.echo("Checking connectors...")
    try:
        import os
        assert os.environ.get("GOOGLE_CREDENTIALS_PATH"), "GOOGLE_CREDENTIALS_PATH not set"
        click.echo("  google_drive: credentials path configured")
    except AssertionError as e:
        click.echo(f"  google_drive: WARNING — {e}")

    click.echo("Validation complete.")


@main.group()
def sync() -> None:
    """Sync data from connected services."""


@sync.command("drive")
def sync_drive() -> None:
    """Sync Google Drive connector."""
    import os
    from connectors import GoogleDriveConnector
    root = os.environ.get("GOOGLE_DRIVE_ROOT_FOLDER_ID")
    if not root:
        raise click.ClickException("GOOGLE_DRIVE_ROOT_FOLDER_ID not set in .env")
    conn = GoogleDriveConnector()
    files = conn.list_folder(root)
    click.echo(f"Found {len(files)} items in root folder.")
    for f in files:
        click.echo(f"  {f['name']} ({f['mimeType']})")


@main.group()
def workflows() -> None:
    """Manage workflow templates."""


@workflows.command("list")
def workflows_list() -> None:
    """List available workflow templates."""
    click.echo("Available workflows:")
    click.echo("  clinical_handover  — care team transition package")


if __name__ == "__main__":
    main()

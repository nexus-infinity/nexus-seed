import os
from pathlib import Path
from typing import Optional

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/drive"]


class GoogleDriveConnector:
    def __init__(
        self,
        credentials_path: str | None = None,
        token_path: str | None = None,
    ) -> None:
        self.credentials_path = credentials_path or os.environ["GOOGLE_CREDENTIALS_PATH"]
        self.token_path = token_path or os.environ["GOOGLE_TOKEN_PATH"]
        self._service = None

    def _authenticate(self) -> Credentials:
        creds: Optional[Credentials] = None
        token = Path(self.token_path)
        if token.exists():
            creds = Credentials.from_authorized_user_file(self.token_path, SCOPES)
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    self.credentials_path, SCOPES
                )
                creds = flow.run_local_server(port=0)
            token.parent.mkdir(parents=True, exist_ok=True)
            token.write_text(creds.to_json())
        return creds

    @property
    def service(self):
        if self._service is None:
            self._service = build("drive", "v3", credentials=self._authenticate())
        return self._service

    def list_folder(self, folder_id: str) -> list[dict]:
        try:
            results = (
                self.service.files()
                .list(
                    q=f"'{folder_id}' in parents and trashed=false",
                    fields="files(id, name, mimeType, modifiedTime)",
                )
                .execute()
            )
            return results.get("files", [])
        except HttpError as e:
            raise RuntimeError(f"Google Drive list_folder failed: {e}") from e

    def get_file_metadata(self, file_id: str) -> dict:
        try:
            return (
                self.service.files()
                .get(fileId=file_id, fields="id, name, mimeType, modifiedTime, size")
                .execute()
            )
        except HttpError as e:
            raise RuntimeError(f"Google Drive get_file_metadata failed: {e}") from e

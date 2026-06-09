from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

from schemas.care_team import CareTeam, CareTeamMember
from schemas.document import Document, DocumentType


@dataclass
class HandoverPackage:
    client_id: str
    generated_at: datetime = field(default_factory=datetime.utcnow)
    care_team: Optional[CareTeam] = None
    active_documents: list[Document] = field(default_factory=list)
    summary: str = ""
    alerts: list[str] = field(default_factory=list)


class ClinicalHandoverWorkflow:
    """
    Generates a structured handover package for care team transitions.
    Intended to be subclassed or configured per client deployment.
    """

    def __init__(self, client_id: str) -> None:
        self.client_id = client_id

    def generate(
        self,
        care_team: CareTeam,
        documents: list[Document],
        summary: str = "",
    ) -> HandoverPackage:
        alerts: list[str] = []

        expired = [d for d in documents if d.is_expired()]
        for doc in expired:
            alerts.append(f"EXPIRED document: {doc.title} (type: {doc.doc_type})")

        pending = [d for d in documents if d.status.value == "pending_review"]
        for doc in pending:
            alerts.append(f"PENDING REVIEW: {doc.title}")

        active = [d for d in documents if not d.is_expired()]

        return HandoverPackage(
            client_id=self.client_id,
            care_team=care_team,
            active_documents=active,
            summary=summary,
            alerts=alerts,
        )

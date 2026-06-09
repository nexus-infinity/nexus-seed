from datetime import date, timedelta

import pytest

from schemas.care_team import CareRole, CareTeam, CareTeamMember
from schemas.document import Document, DocumentStatus, DocumentType
from schemas.contact import Contact, ContactType


def test_care_team_primary():
    team = CareTeam(
        client_id="test",
        members=[
            CareTeamMember(name="Dr A", role=CareRole.GP, is_primary=True),
            CareTeamMember(name="Dr B", role=CareRole.SPECIALIST),
        ],
    )
    assert team.primary().name == "Dr A"


def test_care_team_by_role():
    team = CareTeam(
        client_id="test",
        members=[
            CareTeamMember(name="Dr A", role=CareRole.GP),
            CareTeamMember(name="Dr B", role=CareRole.GP),
            CareTeamMember(name="Alice", role=CareRole.CARER),
        ],
    )
    assert len(team.by_role(CareRole.GP)) == 2
    assert len(team.by_role(CareRole.CARER)) == 1


def test_document_not_expired():
    doc = Document(
        id="d1",
        title="Will",
        doc_type=DocumentType.LEGAL,
        date_expires=date.today() + timedelta(days=365),
    )
    assert not doc.is_expired()


def test_document_expired():
    doc = Document(
        id="d2",
        title="Old Certificate",
        doc_type=DocumentType.IDENTITY,
        date_expires=date.today() - timedelta(days=1),
    )
    assert doc.is_expired()


def test_document_no_expiry():
    doc = Document(id="d3", title="Care Plan", doc_type=DocumentType.CARE_PLAN)
    assert not doc.is_expired()


def test_contact_round_trip():
    c = Contact(id="c1", name="Jane Smith", contact_type=ContactType.EMERGENCY)
    assert c.contact_type == ContactType.EMERGENCY


def test_care_team_member_phone_normalised():
    m = CareTeamMember(name="Dr C", role=CareRole.SPECIALIST, phone="+61 (02) 9999-1234")
    assert " " not in m.phone

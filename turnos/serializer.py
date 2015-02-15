from rest_framework import serializers
from turnos.models import Calendar, Department, Person, Role, Event, EventId, Response, EventRoles
from django.utils.translation import ugettext_lazy as _


class DepartmentS(serializers.ModelSerializer):
  class Meta:
    model = Department


class RoleS(serializers.ModelSerializer):
  class Meta:
    model = Role

class PersonS(serializers.ModelSerializer):
  class Meta:
    model = Person

class CalendarS(serializers.ModelSerializer):
  class Meta:
    model = Calendar

class EventIdS(serializers.ModelSerializer):
  class Meta:
    model = EventId

class EventS(serializers.ModelSerializer):
  class Meta:
    model = Event

class EventSerializer(serializers.ModelSerializer):
  event_id = EventIdS(required=False)

  class Meta:
    model = Event

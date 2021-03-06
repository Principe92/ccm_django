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
  department = DepartmentS(many=True, read_only=False, required=False)

  class Meta:
    model = Person

class PersonS2(serializers.ModelSerializer):
  class Meta:
    model = Person
    fields = ('id', 'name', 'first_surname' )

class CalendarS(serializers.ModelSerializer):
  class Meta:
    model = Calendar

class EventIdS(serializers.ModelSerializer):
  class Meta:
    model = EventId

class EventS(serializers.ModelSerializer):
  class Meta:
    model = Event

class EventRolesS(serializers.ModelSerializer):
  persons = PersonS2(many=True, required=False)

  class Meta:
    model = EventRoles

#-------------------------------------------------------------------------------
# Serializers of an event for a particular calendar of a department
class getPersons(serializers.ModelSerializer):
  persons = PersonS2(many=True, required=False)
  role = RoleS(required=False)

  class Meta:
    model = EventRoles
    fields = ('persons', 'role', 'event')

class getRoles(serializers.ModelSerializer):
  roleList = getPersons(many=True, required=False)

  class Meta:
    model = Role
    fields = ('id', 'title', 'roleList')

class EventSerializer(serializers.ModelSerializer):
  event_number = EventIdS(required=False)
  eventList = getPersons(many=True, required=False)

  class Meta:
    model = Event
    fields = ('id', 'title', 'date', 'event_number', 'eventList')
# ------------------------------------------------------------------------------

class miniCalendar(serializers.ModelSerializer):
  class Meta:
    model = Calendar
    fields=('id', 'month')

class GroupSerializer(serializers.ModelSerializer):
  calendars = miniCalendar(required=False, many=True)
  members = PersonS2(required=False, read_only=True, many=True)

  class Meta:
    model = Department

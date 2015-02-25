# Import all necessary files
import datetime
from django.db import models
from django.utils import timezone

# Create your models here.
# Department table - stores all the ministry's department
class Department(models.Model):
    title = models.CharField(max_length=250, unique=True)

    def __unicode__(self):
        return self.title

    class Meta:
        db_table = "department"

# Person table
class Person(models.Model):
    name = models.CharField(max_length=20)
    first_surname = models.CharField(max_length=20)
    second_surname = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    address = models.CharField(max_length=200, blank=True)
    pbox = models.CharField(max_length=10, blank=True, default='')
    city = models.CharField(max_length=100, blank=True)
    province = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    number = models.CharField(max_length=20, blank=True)
    nationality = models.CharField(max_length=100, blank=True, default='')
    created = models.DateTimeField('date created', auto_now_add=True)
    updated = models.DateTimeField('date updated', auto_now=True)
    department = models.ManyToManyField(Department, related_name='members')

    class Meta:
      db_table = "person"

    def __unicode__(self):
      return self.name

    def get_full_name(self):
      return ' '.join([self.name, self.first_surname, self.second_surname])


# Membership - stores all the departments a person belong to
"""
class Membership(models.Model):
    department = models.ForeignKey(Department)
    person = models.ForeignKey(Person)
    date_joined = models.DateField('Date Joined', blank=True)

    class Meta:
        db_table = "membership"

"""
# Role table
class Role(models.Model):
    department = models.ForeignKey(Department, related_name='roles')
    title = models.CharField(max_length=20)

    class Meta:
      db_table = "role"
      unique_together = ("title", "department")

# Calendar table - stores all the monthly calendars for each department
class Calendar(models.Model):
    month = models.DateField()
    observation = models.TextField(default='', blank=True)
    created = models.DateTimeField('date created', auto_now_add=True)
    updated = models.DateTimeField('date updated', auto_now=True)
    department = models.ForeignKey(Department, related_name='calendars')

    def __unicode__(self):
        return self.month

    def get_owner(self):
      return self.department

    class Meta:
      db_table = "calendar"
      unique_together = ("month", "department")
      get_latest_by = "month"

# Service table - stores all the schedule events
class Event(models.Model):
    calendar = models.ForeignKey(Calendar, related_name='cal_event')
    department = models.ForeignKey(Department, related_name='events')
    title = models.CharField(max_length=30)
    date = models.DateTimeField('event date')
    roles = models.ManyToManyField(Role, through='EventRoles')

    class Meta:
      db_table = "event"
      unique_together = ("date", "department")

# DVD Recording identification number - stores the id for each event
class EventId(models.Model):
    event = models.OneToOneField(Event, primary_key=True, related_name='event_number')
    number = models.IntegerField(default=0)

    class Meta:
      db_table = "event_id"



# Response table
class Response(models.Model):
    person = models.ForeignKey(Person)
    event = models.ForeignKey(Event)
    comment = models.CharField(max_length=150, blank=True)
    response = models.BooleanField(default=True)
    created = models.DateTimeField('date created', auto_now_add=True)
    updated = models.DateTimeField('date updated', auto_now=True)

    class Meta:
      db_table = "response"


# Service Role table - stores all the roles assigned to each person
class EventRoles(models.Model):
    event = models.ForeignKey(Event)
    role = models.ForeignKey(Role)
    persons = models.ManyToManyField(Person)

    class Meta:
        db_table = "event_roles"

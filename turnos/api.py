import datetime
from rest_framework import generics, permissions
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from turnos.serializer import DepartmentS, RoleS, PersonS, CalendarS, EventS, EventIdS
from turnos.models import Department, Role, Person, Calendar, Event, EventId
from turnos.serializer import EventSerializer


class DepartmentList(generics.ListCreateAPIView):
  serializer_class = DepartmentS
  queryset = Department.objects.all()


  def perform_create(self, serializer):
    print(serializer.data)
    serializer.save()

class GroupDetailAPI(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = DepartmentS
  queryset = Department.objects.all()

class PersonListAPI(generics.ListAPIView):
  serializer_class = PersonS
  queryset = Person.objects.all()

class GroupScheduleAPI(APIView):

  def get(self, request, group_pk, format=None):
    department = get_object_or_404(Department, pk=group_pk)
    snippets = Calendar.objects.filter(department=department)
    serializer = CalendarS(snippets, many=True)
    return Response(serializer.data)

  def post(self, request, group_pk, format=None):
    # Confirm that pk exists
    department = get_object_or_404(Department, pk=group_pk)

    get_month = request.data.get('month')
    today = datetime.date.today()

    month = datetime.date(today.year, get_month, 1)
    observation = request.data.get('observation', None)
    serializer = CalendarS(data= {'month' : month,
                                  'department' : group_pk,
                                  'observation' : observation})

    print('Over Here')
    if serializer.is_valid():
      serializer.save()
      print('new calendar created')

      return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Error occurred
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupEventAPI(APIView):

  def get(self, request, group_pk, calendar_pk, format=None):
    calendar = get_object_or_404(Calendar, pk=calendar_pk)
    snippets = Event.objects.filter(calendar=calendar)
    serializer = EventS(snippets, many=True)
    return Response(serializer.data)

  def post(self, request, group_pk, calendar_pk, format=None):
    print(request.data)
    # Confirm that pk exists
    calendar = get_object_or_404(Calendar, pk=calendar_pk)

    time = datetime.time(request.data.get('hour'), request.data.get('minute'), 0, 0)
    date = datetime.date(request.data.get('year'), request.data.get('month'), request.data.get('day'))
    event_time = datetime.datetime.combine(date, time)
    title = request.data.get('title', None)
    event_id = request.data.get('id', None)

    newEvent_data = {
      'department' : group_pk,
      'calendar' : calendar_pk,
      'title' : title,
      'date' : event_time
      }
    serializer = EventS(data=newEvent_data)

    if serializer.is_valid():
      serializer.save()

      event = serializer.data
      savedEvent_pk = event.get('id')

      if event_id:
        new_id = {
          'event' : savedEvent_pk,
          'number' : event_id
        }
        idSerial = EventIdS(data=new_id)

        if idSerial.is_valid():
          savedEvent = get_object_or_404(Event, pk=savedEvent_pk)
          savedEvent_id = EventId(event=savedEvent, number=event_id)
          savedEvent_id = savedEvent_id.save()

          # Serialize the just stored event id
          ser = EventIdS(savedEvent_id)

          #combine with event details and serialize
          serializer = EventSerializer(savedEvent)
          return Response(serializer.data, status=status.HTTP_201_CREATED)

        else:
          new_event = get_object_or_404(Event, pk=pk)
          new_event.delete()
          return Response(idSerial.errors, status=status.HTTP_400_BAD_REQUEST)

      return Response(event, status=status.HTTP_201_CREATED)

    # Error occurred
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GroupMemberAPI(generics.ListAPIView):
  queryset = Person.objects.all()
  serializer_class = PersonS

  def get_queryset(self):
    queryset = super(GroupMemberAPI, self).get_queryset()
    return self.queryset.filter(department__id=self.kwargs.get('pk'))

class GroupListAPI(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Department.objects.all()
        serializer = DepartmentS(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
      print(request.data)
      # retrieve title
      department = {'title' : request.data.get('title')}

      # serialize and check if it is valid
      serializer = DepartmentS(data=department)
      if serializer.is_valid():
        # Save and retrieve id
        serializer.save()

        department = serializer.data
        pk = department.get('id')

        # Check if we have new roles to save
        if 'newRole_1' in request.data:
          role = {'title' : request.data.get('newRole_1'), 'department': pk}

          rolS = RoleS(data=role)
          print('Over Here')
          if rolS.is_valid():
            rolS.save()
          else:
            return Response(rolS.errors, status=status.HTTP_400_BAD_REQUEST)

        if 'newRole_2' in request.data:
          role = {'title' : request.data.get('newRole_2'), 'department': pk}

          rolS = RoleS(data=role)
          if rolS.is_valid():
            rolS.save()
          else:
            return Response(rolS.errors, status=status.HTTP_400_BAD_REQUEST)

        if 'newRole_3' in request.data:
          role = {'title' : request.data.get('newRole_3'), 'department': pk}

          rolS = RoleS(data=role)
          if rolS.is_valid():
            rolS.save()
          else:
            return Response(rolS.errors, status=status.HTTP_400_BAD_REQUEST)


        return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DepartmentRoles(generics.ListCreateAPIView):
  model = Role
  serializer_class = RoleS

  def get_queryset(self):
    queryset = super(DepartmentRoles, self).get_queryset()
    return queryset.filter(department__id=self.kwargs.get('pk'))


class RoleList(generics.ListCreateAPIView):
  model = Role
  serializer_class = RoleS
  queryset = Role.objects.all()

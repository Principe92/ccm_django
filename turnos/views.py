import json, datetime, pytz
from django.utils import timezone
from rest_framework import status
from django.shortcuts import render, get_object_or_404
from django.forms.formsets import formset_factory
from rest_framework import permissions, viewsets, generics
from rest_framework.response import Response
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.http import HttpResponseBadRequest
from audiovisual.forms import DepartmentForm, RoleForm, FormRole, FormPersonNew, CalendarForm
from django.utils.six import BytesIO

from turnos.models import Calendar, Department, Person
from django.views.generic import TemplateView
from turnos.serializer import DepartmentS

from audiovisual.forms import FormEvent

class GroupBaseView(TemplateView):
  template_name = 'turnos/base_group.html'
  #form = DepartmentForm()

  def get_context_data(self, *args, **kwargs):
    context = super(GroupBaseView, self).get_context_data(**kwargs)
    #context.update(form = self.form)
    return context


class PersonBaseView(TemplateView):
  template_name = 'turnos/base_group.html'

  def get_context_data(self, *args, **kwargs):
    context = super(PersonBaseView, self).get_context_data(**kwargs)
    return context


"""
class GroupTurnView(TemplateView):
  template_name = 'admin/department_turn.html'
  form = CalendarForm(initial={'month': timezone.now()})
  eventForm = FormEvent()


  def post(self, request, *args, **kwargs):
    if not request.is_ajax():
      return HttpResponseBadRequest('Expected an XMLHttpRequest')

    data = json.loads(request.body)

    if 'date' in data:
      time = datetime.time(data.get('time'))
      date = datetime.date(data.get('date'))
      event_time = datetime.datetime.combine(date, time)
      title = data.get('title', None)
      event_id = data.get('id', None)
      newForm = FormEvent(data = {'title': title, 'date': event_time})

      if newForm.is_valid():
        print('Success')

        #Convert Back to json and return
        data = json.dumps(data)
        return HttpResponse(data, status=status.HTTP_201_CREATED)

    elif 'month' in data:
      get_month = data.get('month')
      today = datetime.date.today()
      save_date = datetime.date(today.year, get_month, 1)
      newForm = CalendarForm(data= {'month' : save_date,
                                  'observation' : data.get('observation', None)})

      if newForm.is_valid():
        author = newForm.save(commit=False)
        pk = self.kwargs.get('pk', None)
        author.department = get_object_or_404(Department, pk=pk)
        author.save()
        print('Form saved')

        #Convert Back to json and return
        data = json.dumps(data)
        return HttpResponse(data, status=status.HTTP_201_CREATED)

    return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

  def get_context_data(self, *args, **kwargs):
    context = super(GroupTurnView, self).get_context_data(**kwargs)

    pk = self.kwargs.get('pk', None)
    new_month = self.kwargs.get('month', None)
    department = get_object_or_404(Department, pk=pk)
    context['group'] = department
    context['month'] = 0

    try:
      today = datetime.date.today()
      today = today.replace(day=1)
      latest_calendar = Calendar.objects.filter(department=department).filter(month = today).values('month')
      #department.calendar_set().latest()
      #Calendar.objects.latest().filter(department=department)

    except (KeyError, Calendar.DoesNotExist):
      print('No calendars available')

    else:

      if latest_calendar:
        last_month = latest_calendar[0].get('month') # Get the month field
        self.form = CalendarForm(initial={'month': last_month.month})

    context.update(form = self.form)
    context.update(eventForm = self.eventForm)
    return context

  @method_decorator(ensure_csrf_cookie)
  def dispatch(self, *args, **kwargs):
    return super(GroupTurnView, self).dispatch(*args, **kwargs)

"""
class IndexView(TemplateView):
  template_name = 'admin/department_index.html'
  RoleFormset = formset_factory(RoleForm, extra=3)
  form = DepartmentForm()
  formset = RoleFormset()

  @method_decorator(ensure_csrf_cookie)
  def dispatch(self, *args, **kwargs):
    return super(IndexView, self).dispatch(*args, **kwargs)

  def get_context_data(self, *args, **kwargs):
    context = super(IndexView, self).get_context_data(**kwargs)
    context.update(form = self.form)
    context.update(formset = self.formset)
    return context


# Create your views here.
class DepartmentViewSet(viewsets.ModelViewSet):

  def list(self, request):
      queryset = Department.objects.all()
      serializer = DepartmentS(queryset, many=True)
      return Response(serializer.data)

  def retrieve(self, request, pk=None):
      queryset = Department.objects.all()
      user = get_object_or_404(queryset, pk=pk)
      serializer = DepartmentS(user)
      return Response(serializer.data)

class EachDepartmentViewSet(viewsets.ViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentS

    def list(self, request, group_id=None):
        queryset = self.queryset.filter(pk=group_id)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

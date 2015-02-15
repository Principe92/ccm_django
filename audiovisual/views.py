from django.http import HttpResponse, HttpResponseRedirect,  HttpResponseBadRequest
from django.shortcuts import render, get_object_or_404
from django.core.urlresolvers import reverse
from turnos.models import Person, Department, Role, Calendar, Event
from .forms import DepartmentForm, RoleForm, FormRole, FormPersonNew, CalendarForm
from django.template import RequestContext, loader
from django.shortcuts import redirect
from django.forms.formsets import formset_factory
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.generic import TemplateView
import json
from django.views.decorators.csrf import csrf_exempt

"""

class NewTurn(TemplateView):
  template_name = 'admin/department_turn.html'
  form = CalendarForm()

  def get_context_data(self, *args, **kwargs):
    context = super(NewTurn, self).get_context_data(**kwargs)

    pk = self.kwargs.get('pk', None)
    new_month = self.kwargs.get('month', None)

    persons = Person.objects.filter(department__id=pk).values('name', 'first_surname').order_by('name')
    calendars = Calendar.objects.filter(department__id=pk).order_by('month')
    department = Department.objects.get(pk=pk)
    context.update(form=CalendarForm())

    extra_context = {'person_list': persons,
                    'group':department,
                    'calendars': calendars}

    for key, value in extra_context.items():
      if callable(value):
        context[key] = value()
      else:
        context[key] = value

    return context

  @csrf_exempt
  def dispatch(self, *args, **kwargs):
    return super(NewTurn, self).dispatch(*args, **kwargs)


  def post(self, request, *args, **kwargs):
    if not request.is_ajax():
      return HttpResponseBadRequest('Expected an XMLHttpRequest')

    in_data = json.loads(request.body)
    form = CheckoutForm(data={'subject': in_data.get('subject')})

    if form.is_valid():
      new_calendar = form.save(commit=False)
      department = Department.objects.get(pk=pk)
      new_calendar.department = department
      new_calendar.save()

      return HttpResponseRedirect(reverse('audiovisual.views.DepartmentTurn',
                                      args=(pk, new_calendar.id)))

"""

@login_required(login_url='/admin/login')
def controls(request):
    users = User.objects.all()
    context = {'user_list':users}
    return render(request, 'admin/panel_de_control.html', context)

@login_required(login_url='/admin/login')
def DepartmentIndex(request):
  department_list = Department.objects.order_by('title')
  RoleFormset = formset_factory(RoleForm, extra=3)
  form = DepartmentForm()
  formset = RoleFormset()

  if request.method == "POST":
    # save button pressed
    if 'save' in request.POST:
      print('save button pressed')
      form = DepartmentForm(request.POST)
      formset = RoleFormset(request.POST, request.FILES)

      if form.is_valid() and formset.is_valid():
        title = form.cleaned_data['title']

        # create a new department
        new_department = Department.objects.create(title = title)

        for form in formset:
          data = form.cleaned_data
          title = data.get('title')

          # if not empty
          if title:
            Role.objects.create(department=new_department, title=title)


        form = DepartmentForm()
        formset = RoleFormset()
        pass

    # Cancel button pressed
    elif 'cancel' in request.POST:
      form = DepartmentForm()
      formset = RoleFormset()
      print('cancel button pressed')

  # method = GET
  else:
    form = DepartmentForm()
    formset = RoleFormset()

  context= {'department_list' : department_list, 'form':form, 'formset':formset}
  return render(request, 'admin/department_index.html', context)

# Page for roles in a particular department with id = pk
@login_required(login_url='/admin/login')
def DepartmentRole(request, pk):
  department = get_object_or_404(Department, pk=pk)

  if request.method == "POST":
    # save button pressed
    if 'save' in request.POST:
      print('save button pressed')
      form = FormRole(request.POST)

      if form.is_valid():
        title = form.cleaned_data['title']

        # create a new Role
        Role.objects.create(department=department, title=title)

        # generate a new form for redirection
        form = FormRole()

      # Get all Roles belonging to the Department with id = pk
      roles = Role.objects.filter(department = department)

    # Cancel button pressed
    elif 'cancel' in request.POST:
      form = FormRole()

      # Get all Roles belonging to the Department with id = pk
      roles = department.role_set.all()
      print('cancel button pressed')

  # method = GET
  else:
    form = FormRole()

    # Get all Roles belonging to the Department with id = pk
    roles = Role.objects.filter(department = department)

  # Display the roles page with empty role
  context= {'role_list':roles, 'department':department, 'form':form}
  return render(request, 'admin/department_rol.html', context)

@login_required(login_url='/admin/login')
def DepartmentPerson(request, pk):
  person_list = Person.objects.filter(department__id=pk)
  department = get_object_or_404(Department, pk=pk)
  context= {'person_list' : person_list, 'department':department}
  return render(request, 'admin/department_members.html', context)

@login_required(login_url='/admin/login')
def DepartmentTurn(request, pk, month=0, new_month=True, new_event=False):
  persons = Person.objects.filter(department__id=pk).values('name', 'first_surname').order_by('name')
  calendars = Calendar.objects.filter(department__id=pk).order_by('month')
  department = Department.objects.get(pk=pk)
  #events = Event.objects.filter(calendar__month=month).order_by('date')
  form = CalendarForm()

  if request.method == "POST":
    # save button pressed
    if 'save' in request.POST:
      print('save button pressed')
      form = CalendarForm(request.POST)

      if form.is_valid():
        new_calendar = form.save(commit=False)
        department = Department.objects.get(pk=pk)
        new_calendar.department = department
        new_calendar.save()

        return HttpResponseRedirect(reverse('audiovisual.views.DepartmentTurn',
                                    args=(pk, new_calendar.id)))
    elif 'cancel' in request.POST:
      new_month = False

  context= {  'person_list': persons,
              'form':form,
              'group':department,
              'calendars': calendars,
              'new_month': new_month,
              'new_event': new_event}
  return render(request, 'admin/department_turn.html', context)


# Page for all persons
@login_required(login_url='/admin/login')
def PersonIndex(request):
    person_list = Person.objects.all()[:15]
    context= {'person_list' : person_list}
    return render(request, 'admin/personas.html', context)

# Page for a particular person
@login_required(login_url='/admin/login')
def PersonDetail(request, pk):
  person = get_object_or_404(Person, pk=pk)
  context = {'person':person}
  return render(request, 'admin/person_detail.html', context)

# Page to edit a person
@login_required(login_url='/admin/login')
def PersonEdit(request, pk):
  person = get_object_or_404(Person, pk=pk)
  form = FormPersonNew(instance=person)

  if request.method == "POST":
    # save button pressed
    if 'save' in request.POST:
      form = FormPersonNew(request.POST, instance=person)

      if form.is_valid():
        form.save()


    return HttpResponseRedirect(reverse('audiovisual.views.PersonDetail', args=(pk,)))

  # Display the edit person page
  context= {'form':form}
  return render(request, 'admin/person_edit.html', context)


# Page to edit a person
@login_required(login_url='/admin/login')
def PersonClear(request, pk):
  return render(request, 'admin/detalle.html')



@login_required(login_url='/admin/login')
def PersonNew(request):
  form = FormPersonNew()

  if request.method == "POST":
    # save button pressed
    if 'save' in request.POST or 'save_new' in request.POST:
      print('save button pressed')
      form = FormPersonNew(request.POST)

      if form.is_valid():
        form.save()

        # generate a new form for redirection
        form = FormPersonNew()

        if 'save_new' in request.POST:
          # return to the create page
          return HttpResponseRedirect(reverse('audiovisual.views.PersonNew'))

    elif 'cancel' in request.POST:
      # return to the list of persons
      return HttpResponseRedirect(reverse('audiovisual.views.PersonIndex'))

  # Display the roles page with empty or error filled form
  context= {'form':form}
  return render(request, 'admin/person_create.html', context)


@login_required(login_url='/admin/login')
def details(request):
    return render(request, 'admin/detalle.html')

@login_required(login_url='/admin/login')
def turns(request):
  return render(request, 'admin/detalle.html')

# Page for all roles in all department
@login_required(login_url='/admin/login')
def RoleIndex(request):
  role_list = Role.objects.all()[:15]
  context= {'role_list' : role_list}
  return render(request, 'admin/roles_index.html', context)

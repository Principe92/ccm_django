from django import forms
from turnos.models import Department, Role, Person, Calendar, Event
from django.forms.models import inlineformset_factory
from django.utils.translation import ugettext_lazy as _
from djangular.forms import NgModelFormMixin, NgModelForm, NgForm
from collections import OrderedDict
from turnos.datewidget import MonthYearWidget

class RoleForm(NgModelFormMixin, NgForm):
  newRole_1 = forms.CharField(label='Roles o estados:', required=False, widget=forms.TextInput({ "placeholder": "Introduce un rol"}))
  newRole_2 = forms.CharField(label='Roles o estados:', required=False, widget=forms.TextInput({ "placeholder": "Introduce un rol"}))
  newRole_3 = forms.CharField(label='Roles o estados:', required=False, widget=forms.TextInput({ "placeholder": "Introduce un rol"}))

class DepartmentForm(RoleForm):
  title = forms.CharField(required=True)

  def __init__(self, *args, **kwargs):
    kwargs.update(scope_prefix='new_group')
    super(DepartmentForm, self).__init__(*args, **kwargs)
    fields_key_order = ['title', 'newRole_1', 'newRole_2', 'newRole_3']
    if (self.fields.has_key('keyOrder')):
      self.fields.keyOrder = fields_key_order
    else:
      self.fields = OrderedDict((k, self.fields[k]) for k in fields_key_order)

class FormRole(forms.Form):
  title = forms.CharField(label='Roles o estados:', widget=forms.TextInput({ "placeholder": "Introduce un rol"}))

class FormPersonNew(forms.ModelForm):
  department = forms.ModelMultipleChoiceField(label='Departamento', queryset=Department.objects.all(), widget=forms.CheckboxSelectMultiple(), required=True)
  error_css_class = 'error'
  required_css_class = 'required'

  class Meta:
    model = Person
    fields  = '__all__'
    labels = {  'name': _('Nombre'),
                'first_surname': _('Primer appellido'),
                'second_surname': _('Segundo appellido'),
                'email': _('Correo electronico'),
                'address': _('Direccion'),
                'pbox': _('Codigo postal'),
                'city': _('Ciudad'),
                'province': _('Provincia'),
                'country':_('Pais'),
                'number': _('Telefono'),
                'nationality':_('Nationalidad')
                }

class CalendarForm(NgModelFormMixin, NgModelForm):

  class Meta:
    model = Calendar
    exclude = ['department']
    labels = {  'month': _('Mes'),
                'observation': _('Observaciones')}

  def __init__(self, *args, **kwargs):
    kwargs.update(scope_prefix='new_month')
    super(CalendarForm, self).__init__(*args, **kwargs)

class FormEvent(forms.ModelForm):
  class Meta:
    model = Event
    exclude = ['calendar', 'roles']

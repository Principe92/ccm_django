from django import forms
from turnos.models import Department, Role, Person, Calendar, Event
from django.forms.models import inlineformset_factory
from django.utils.translation import ugettext_lazy as _
from djangular.forms import NgModelFormMixin, NgModelForm, NgForm, NgFormValidationMixin
from collections import OrderedDict

class widgetText(forms.TextInput):
  class Media:
    css = { 'all': ('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css',
                    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css')
          }

    js = ('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js',
          'angularjs/js/ui-bootstrap.0.12.0.js'
          )
# Calendar Form
class FormEvent(NgModelFormMixin, NgModelForm):
  date = forms.DateField(label='fecha', required=True, widget=widgetText)
  time = forms.TimeField(label='horario', required=True, widget=widgetText)
  event_id = forms.IntegerField(label='Grabaciones', required=False, widget=widgetText)

  class Meta:
    model = Event
    exclude = ['calendar', 'date', 'roles']
    label = {'title':_('titulo'),}
    widgets = {'title':widgetText}

  def __init__(self, *args, **kwargs):
    kwargs.update(scope_prefix='new_event')
    super(FormEvent, self).__init__(*args, **kwargs)



def addHelper(object):
  object.helper = FormHelper()
  object.helper.form_class = 'form-horizontal'
  object.helper.label_class = 'col-sm-1 control-label'
  object.helper.field_class = 'form-control input-sm'

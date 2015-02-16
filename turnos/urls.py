from django.conf.urls import patterns, url, include

from turnos.api import DepartmentList, DepartmentRoles, GroupMemberAPI
from turnos.api import RoleList, GroupListAPI, GroupDetailAPI, GroupScheduleAPI, GroupEventAPI
from turnos.api import PersonListAPI
from turnos.views import DepartmentViewSet, IndexView, EachDepartmentViewSet, GroupBaseView
from turnos.views import PersonBaseView
from rest_framework_nested import routers
from audiovisual import views

from turnos.partial import GroupPartialView

router = routers.SimpleRouter()
router.register(r'group_list', DepartmentViewSet, 'Department')

department_url = patterns('',
  #url(r'^admin/departments/(?P<pk>\d+)/turnos/(?P<month>\d+)$', DepartmentTurns.as_view(), name='department_turns'),

  url(r'^/(?P<pk>\d+)/turns/(?P<month>\d+)/$', GroupBaseView.as_view(), name='group_turnView'),
  url(r'^/(?P<pk>\d+)/members/$', GroupBaseView.as_view(), name='group_memberView'),
  url(r'^/(?P<pk>\d+)/roles/$', GroupBaseView.as_view(), name='group_roleView'),
  url(r'^/$', GroupBaseView.as_view(), name='groups')
)

person_url = patterns('',
  url(r'^(?P<pk>\d+)/details/$', PersonBaseView.as_view(), name='person_details'),
  url(r'^new/$', PersonBaseView.as_view(), name='person_create'),
  url(r'^$', PersonBaseView.as_view(), name='persons')
)

partial_url = patterns('',
  url(r'^view/group_roles.html$', GroupPartialView.as_view(template_name = 'turnos/partials/group_roles.html'), name='group_rolePartial'),
  url(r'^view/group_members.html$', GroupPartialView.as_view(template_name = 'turnos/partials/group_members.html'), name='group_memberPartial'),
  url(r'^view/group_detail.html$', GroupPartialView.as_view(template_name = 'turnos/partials/group_detail.html'), name='group_detailPartial'),
  url(r'^view/group_main.html$', GroupPartialView.as_view(template_name = 'turnos/partials/group_main.html'), name='group_listPartial'),

  url(r'^view/person_main.html$', GroupPartialView.as_view(template_name = 'turnos/partials/person_main.html'), name='person_mainPartial'),
  url(r'^view/person_create.html$', GroupPartialView.as_view(template_name = 'turnos/partials/person_create.html'), name='person_createPartial')
)

api_url = patterns('',
  url(r'^department/(?P<pk>\d+)/member/$', GroupMemberAPI.as_view(), name='group_memberListAPI'),
  url(r'^department/(?P<pk>\d+)/role/$', DepartmentRoles.as_view(), name='api_roles'),
  url(r'^department/(?P<group_pk>\d+)/schedule/$', GroupScheduleAPI.as_view(), name='group_scheduleAPI'),
  url(r'^department/(?P<pk>\d+)/$', GroupDetailAPI.as_view(), name='group_detailAPI'),
  url(r'^department/$', GroupListAPI.as_view(), name='group_listAPI'),

  url(r'^event/(?P<group_pk>\d+)/calendar/(?P<calendar_pk>\d+)/$', GroupEventAPI.as_view(), name='group_eventAPI'),

  url(r'^person/$', PersonListAPI.as_view(), name='person_listAPI')
)

role_url = patterns('',
  url(r'^$', RoleList.as_view(), name='role_list')
)

test_url = patterns('',
  url(r'^sys/', include(router.urls)),
  url(r'^/$', GroupBaseView.as_view(), name='group_list'),
)


urlpatterns = patterns('',
    url(r'^department', include(department_url)),
    url(r'^person/', include(person_url)),
    url(r'^partial/', include(partial_url)),
    url(r'^api/', include(api_url)),
    url(r'^role', include(role_url)),
    url(r'^test', include(test_url)),
)

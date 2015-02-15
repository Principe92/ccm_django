from django.conf.urls import patterns, include, url
from django.contrib import admin
from audiovisual import views
from turnos.views import GroupListView

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'audiovisual.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # URL for ROLES
    url(r'^ccm/', include('turnos.urls', namespace="ccm")),

    # ex: /admin/roles/
    url(r'^admin/roles/$', 'audiovisual.views.RoleIndex', name='role_index'),


    # URL for PERSONS
    # ex: /admin/persons/
    url(r'^admin/persons/$', 'audiovisual.views.PersonIndex', name='person_index'),
    # ex: /admin/persons/5
    url(r'^admin/persons/(?P<pk>\d+)/$', 'audiovisual.views.PersonDetail', name='person_detail'),
    # ex: /admin/persons/5/edit
    url(r'^admin/persons/(?P<pk>\d+)/edit/$', 'audiovisual.views.PersonEdit', name='person_edit'),
    # ex: /admin/persons/5/clear
    url(r'^admin/persons/(?P<pk>\d+)/clear/$', 'audiovisual.views.PersonClear', name='person_clear'),
    # ex: /admin/persons/edit/5
    url(r'^admin/persons/create/$', 'audiovisual.views.PersonNew', name='person_new'),

    # URL for DEPARTMENTS
    # ex: /admin/department/
    url(r'^admin/departments/$', GroupListView.as_view(), name='department_index'),
    # ex: /admin/department/members
    url(r'^admin/departments/(?P<pk>\d+)/members/$', 'audiovisual.views.DepartmentPerson', name='department_members'),
    # ex: /admin/department/roles/5
    url(r'^admin/departments/(?P<pk>\d+)/roles/$', 'audiovisual.views.DepartmentRole', name='department_role'),
    # ex: /admin/department/5/turnos/5
    url(r'^admin/departments/(?P<pk>\d+)/turnos/(?P<month>\d+)/$', 'audiovisual.views.DepartmentTurn', name='department_turns'),


    # URL for TURNOS
    url(r'^admin/turns/$', 'audiovisual.views.turns', name='turns'),

    url(r'^admin/controls/$', 'audiovisual.views.controls', name='controls'),
    url(r'^admin/manuals/$', 'audiovisual.views.details', name='manuals'),
    url(r'^admin/details/$', 'audiovisual.views.details', name='details'),
    url(r'^admin/', include(admin.site.urls)),
)

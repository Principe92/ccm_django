from django.contrib import admin
from turnos.models import Person, Department, Role

# Register your models here.

class Roles(admin.TabularInline):
  model = Role
  extra = 3

class DepartmentAdmin(admin.ModelAdmin):
  fieldsets = [
    ('Title', {'fields': ['title']})
  ]

  inlines = [Roles]


admin.site.register(Person)
admin.site.register(Department, DepartmentAdmin)

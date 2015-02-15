from rest_framework import generics, permissions
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

from turnos.serializer import DepartmentS, RoleS, PersonS
from turnos.models import Department, Role, Person


class DepartmentList(generics.ListCreateAPIView):
  serializer_class = DepartmentS
  queryset = Department.objects.all()


  def perform_create(self, serializer):
    print(serializer.data)
    serializer.save()


class group_list(APIView):
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

class DepartmentTurns(generics.ListCreateAPIView):
  model = Role
  serializer_class = RoleS

  def get_queryset(self):
    queryset = super(DepartmentTurns, self).get_queryset()
    return queryset.filter(department__id=self.kwargs.get('pk'))


class DepartmentMembers(generics.ListAPIView):
  model = Person
  serializer_class = PersonS

  def get_queryset(self):
    queryset = super(DepartmentMembers, self).get_queryset()
    return queryset.filter(department__id=self.kwargs.get('pk'))

class RoleList(generics.ListCreateAPIView):
  model = Role
  serializer_class = RoleS
  queryset = Role.objects.all()

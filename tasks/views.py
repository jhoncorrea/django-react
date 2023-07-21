from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task

# Create your views here.
#Al usar esta clase TaskView en conjunto con Django Rest Framework, tendrás una vista que admite las operaciones CRUD 
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    #se utiliza para obtener todas las instancias del modelo Task.
    queryset = Task.objects.all()

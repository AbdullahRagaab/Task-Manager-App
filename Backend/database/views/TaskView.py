from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from database.models import TaskModel
from database.serializers import TaskModelSerializer
from rest_framework.renderers import JSONRenderer
from database.pagination import ModelPagination

# Custom pagination class


class TaskModelViewSet(viewsets.ModelViewSet):
    queryset = TaskModel.objects.all().order_by("-dueDate")
    serializer_class = TaskModelSerializer

    # Enable filtering, searching, ordering
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    # Filters
    filterset_fields = ["status", "priority", "assignee"]
    search_fields = ["title", "description"]
    ordering_fields = ["dueDate", "priority", "status"]
    ordering = ["-dueDate"]  # default ordering

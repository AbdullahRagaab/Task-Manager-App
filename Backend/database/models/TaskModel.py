from django.db import models
from database.constants import StatusChoices, PriorityChoices


class TaskModel(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=255, choices=StatusChoices, default="pending")
    priority = models.CharField(max_length=255, choices=PriorityChoices, default="low")
    dueDate = models.DateField()
    assignee = models.ForeignKey("database.UserModel", on_delete=models.CASCADE)

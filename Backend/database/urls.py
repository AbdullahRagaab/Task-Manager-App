from django.urls import path, include
from rest_framework.routers import DefaultRouter

from database.views import TaskModelViewSet, UserModelViewSet

router = DefaultRouter()

router.register(r'tasks', TaskModelViewSet)
router.register(r'users', UserModelViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]

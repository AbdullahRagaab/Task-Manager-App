from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.db.models import Q

from database.models import UserModel
from database.serializers import UserSerializer, UserAutocompleteSerializer, UserProfilePictureSerializer
from database.pagination import ModelPagination

class UserModelViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes=[IsAuthenticated]
    # permission_classes=[AllowAny]

    @action(detail=False, methods=["get"], url_path="autocomplete")
    def autocomplete(self, request):
        search = request.query_params.get("search", "")
        queryset = self.get_queryset().filter(
            Q(username__icontains=search) |
            Q(full_name__icontains=search) |
            Q(email__icontains=search)
        )
        serializer = UserAutocompleteSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["post"], url_path="upload_profile_picture")
    def upload_profile_picture(self, request):
        user = request.user
        serializer = UserProfilePictureSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Profile picture updated successfully.",
                "profile_picture": serializer.data["profile_picture"]
            })
        return Response(serializer.errors, status=400)
    
    @action(detail=False, methods=["get"], url_path="current")
    def current_user(self, request):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)

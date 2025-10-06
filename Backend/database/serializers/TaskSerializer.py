from rest_framework import serializers
from database.models import TaskModel, UserModel

class TaskModelSerializer(serializers.ModelSerializer):
    assignee = serializers.SerializerMethodField()
    # Accept `assignee` as object from frontend
    assignee_obj = serializers.DictField(write_only=True, required=False)

    class Meta:
        model = TaskModel
        fields = '__all__'

    def get_assignee(self, obj):
        """Return assignee as label/value object."""
        if obj.assignee:
            return {
                "label": str(obj.assignee),
                "value": obj.assignee.id
            }
        return None

    def to_internal_value(self, data):
        """
        Override to process 'assignee' coming as an object with 'value' key.
        """
        data = super().to_internal_value(data)

        assignee_data = self.initial_data.get("assignee")
        if isinstance(assignee_data, dict):
            assignee_id = assignee_data.get("value")
            if assignee_id is not None:
                try:
                    data["assignee"] = UserModel.objects.get(id=assignee_id)
                except UserModel.DoesNotExist:
                    raise serializers.ValidationError({"assignee": "User not found."})
            else:
                data["assignee"] = None
        elif assignee_data is None:
            data["assignee"] = None

        return data
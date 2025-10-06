from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import math

class ModelPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100

    def get_page_size(self, request):
        page_size = request.query_params.get(self.page_size_query_param)
        if page_size == 'all':
            return None  # disables pagination
        return super().get_page_size(request)

    def get_paginated_response(self, data):
        # Call the default implementation first
        response = super().get_paginated_response(data)

        # Calculate total pages (handle None for page size)
        page_size = self.get_page_size(self.request)
        total_pages = (
            math.ceil(self.page.paginator.count / page_size)
            if page_size
            else 1
        )

        # Add `total_pages` to the existing response data
        response.data['total_pages'] = total_pages
        return response

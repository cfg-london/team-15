from django.conf.urls import url, include
from . import views

urlpatterns = [
        url(r'^add$', views.add_referral, name="add_referral"),
]

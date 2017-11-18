# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from referral.models import Referral
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
def dashboard(request):
    referrals_dict = dict()
    referrals_dict["refs"] = Referral.objects.all() \
            .order_by('urgency', '-date')
    return render(request, "dashboard/dash.html", referrals_dict)

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect, render
import json

from .models import Referral, Category

# Create your views here.

@csrf_exempt
def add_referral(request):
    data = json.loads(request.body.decode("utf-8"))

    sender = data['sender']
    name = data['name']
    phone = data['phone']
    urgency = data['urgency']
    category_name = data['category_name']

    category = Category(name=category_name)
    category.save()

    referral = Referral(sender=sender, name=name, phone=phone, urgency=urgency);
    referral.save()

    category.referrals.add(referral)

    return HttpResponse(json.dumps(data))

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
import json

# Create your views here.

def add_referral(request):
    data = json.loads(request.body.decode("ascii"))
    return HttpResponse("Hello World!" + json.dumps(data))

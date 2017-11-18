# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import

from .referral.models import Referral

import cStringIO as StringIO
import csv

# Create your views here.

def csv(request):
    def data():
        referrals = Referral.objects.all()

        # Initialise the csv writer
        csvfile = StringIO.StringIO()
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(["Sender", "Vulnerable adult's name", "Phone number",
                            "Urgent", "Category", "Date", "Location", "Extra info"])

        for entry in referrals:
            csvwriter.writerow([entry.sender, entry.name, entry.phone,
                                entry.urgency, entry.category, entry.date,
                                entry.latitude + ',' + entry.longitude, entry.extrainfo])

        yield csvfile.getvalue()

    response = HttpResponse(data(), mimetype="text/csv")
    response["Content-Disposition"] = "attachment; filename=data.csv"
    return response

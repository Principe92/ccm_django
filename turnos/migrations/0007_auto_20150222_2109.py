# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turnos', '0006_auto_20150219_1741'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calendar',
            name='department',
            field=models.ForeignKey(related_name='calendars', to='turnos.Department'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='eventid',
            name='event',
            field=models.OneToOneField(related_name='event_id', primary_key=True, serialize=False, to='turnos.Event'),
            preserve_default=True,
        ),
    ]

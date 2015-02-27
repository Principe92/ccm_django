# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turnos', '0011_auto_20150227_1151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventroles',
            name='event',
            field=models.ForeignKey(related_name='eventList', to='turnos.Event'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='eventroles',
            name='persons',
            field=models.ManyToManyField(related_name='memberList', to='turnos.Person'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='eventroles',
            name='role',
            field=models.ForeignKey(related_name='roleList', to='turnos.Role'),
            preserve_default=True,
        ),
    ]

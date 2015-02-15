# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turnos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='department',
            field=models.ManyToManyField(related_name='members', to='turnos.Department', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='role',
            name='department',
            field=models.ForeignKey(related_name='roles', to='turnos.Department'),
            preserve_default=True,
        ),
    ]

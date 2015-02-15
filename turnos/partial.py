from django.views.generic import TemplateView



class GroupPartialView(TemplateView):
  def get_context_data(self, **kwargs):
    context = super(GroupPartialView, self).get_context_data(**kwargs)
    # update the context
    return context

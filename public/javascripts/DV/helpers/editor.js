_.extend(DV.Schema.helpers,{
  showAnnotationEdit : function(e) {
    var annoEl = this.viewer.$(e.target).closest(this.annotationClassName);
    var area   = this.viewer.$('.DV-annotationTextArea', annoEl);
    annoEl.addClass('DV-editing');
    area.focus();
  },
  cancelAnnotationEdit : function(e) {
    var annoEl = this.viewer.$(e.target).closest(this.annotationClassName);
    var anno   = this.getAnnotationModel(annoEl);
    this.viewer.$('.DV-annotationTitleInput', annoEl).val(anno.title);
    this.viewer.$('.DV-annotationTextArea', annoEl).val(anno.text);
    if (anno.unsaved) {
      this.models.annotations.removeAnnotation(anno);
    } else {
      annoEl.removeClass('DV-editing');
    }
  },
  saveAnnotation : function(e, option) {
    var target = this.viewer.$(e.target);
    var annoEl = target.closest(this.annotationClassName);
    var anno   = this.getAnnotationModel(annoEl);
    if (!anno) return;
    anno.title  = this.viewer.$('.DV-annotationTitleInput', annoEl).val();
    anno.text   = this.viewer.$('.DV-annotationTextArea', annoEl).val();
    if (target.hasClass('DV-saveAnnotationDraft'))  anno.access = 'exclusive';
    else if (annoEl.hasClass('DV-accessExclusive')) anno.access = 'public';
    if (option == 'onlyIfText' &&
        (!anno.title || anno.title == 'Untitled Note') &&
        !anno.text &&
        !anno.server_id) {
      return this.models.annotations.removeAnnotation(anno);
    }
    annoEl.removeClass('DV-editing');
    this.models.annotations.fireSaveCallbacks(anno);
  },
  deleteAnnotation : function(e) {
    var annoEl = this.viewer.$(e.target).closest(this.annotationClassName);
    var anno   = this.getAnnotationModel(annoEl);
    this.models.annotations.removeAnnotation(anno);
    this.models.annotations.fireDeleteCallbacks(anno);
  }
});
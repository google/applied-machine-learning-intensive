/**
 * Created by bmiller on 5/10/15.
 */


/*
 Since I don't want to modify the codelens code I'll attach the logging functionality this way.
 This actually seems like a better way to do it maybe across the board to separate logging
 from the real funcionality.  It would also allow a better way of turning off/on logging..
 As long as Philip doesn't go and change the id values for the buttons and slider this will
 continue to work.... In the best of all worlds we might add a function to the visualizer to
 return the buttons, but I'm having a hard time thinking of any other use for that besides mine.
 */
function attachLoggers(codelens, divid) {
    rb = new RunestoneBase();
    codelens.domRoot.find("#jmpFirstInstr").click(function () {
        rb.logBookEvent({'event': 'codelens', 'act': 'first', 'div_id': divid});
    });
    codelens.domRoot.find("#jmpLastInstr").click(function () {
        rb.logBookEvent({'event': 'codelens', 'act': 'last', 'div_id': divid});
    });
    codelens.domRoot.find("#jmpStepBack").click(function () {
        rb.logBookEvent({'event': 'codelens', 'act': 'back', 'div_id': divid});
    });
    codelens.domRoot.find("#jmpStepFwd").click(function () {
        rb.logBookEvent({'event': 'codelens', 'act': 'fwd', 'div_id': divid});
    });
    codelens.domRoot.find("#executionSlider").bind('slide', function (evt, ui) {
        rb.logBookEvent({'event': 'codelens', 'act': 'slide', 'div_id': divid});
    });

}

function redrawAllVisualizerArrows() {
    var i;
    if (allVisualizers !== undefined) {
        for (i = 0; i < allVisualizers.length; i++) {
            allVisualizers[i].redrawConnectors();
        }
    }
}
function styleButtons(divid) {
    var myVis = $("#"+divid);
    $(myVis).find("#jmpFirstInstr").addClass('btn btn-default');
    $(myVis).find("#jmpStepBack").addClass('btn btn-danger');
    $(myVis).find("#jmpStepFwd").addClass('btn btn-success');
    $(myVis).find("#jmpLastInstr").addClass('btn btn-default');
}


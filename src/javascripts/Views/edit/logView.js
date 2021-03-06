ngapp.controller('logViewController', function($scope, contextMenuService) {
    // link view to scope
    $scope.view = $scope.$parent.tab;
    $scope.view.scope = $scope;

    // helper functions
    let buildMessageObj = msg => ({
        text: msg.trimRight(),
        class: getMessageClass(msg)
    });

    let onLogMessage = msg => {
        $scope.messages.push(buildMessageObj(msg));
    };

    let getMessageClass = msg => {
        let n = msg[0] === '[' && msg.indexOf(']');
        if (n <= 0) return 'log';
        return `${msg.slice(1, n).toLowerCase()}`;
    };

    // scope functions
    $scope.loadMessages = function() {
        $scope.messages = logger.getMessages().map(buildMessageObj);
    };

    $scope.showContextMenu = function(e) {
        contextMenuService.showContextMenu($scope, e);
    };

    // initialization
    $scope.loadMessages();

    // event handlers
    logger.addCallback('log', onLogMessage);

    $scope.$on('destroy', function() {
        logger.removeCallback('log', onLogMessage);
    });
});

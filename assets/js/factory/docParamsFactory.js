csgJobSubTool.factory('docParams', function(){
    var docArr = []
    
    return{
        addDoc      : addDoc,
        getDocArr   : getDocArr   
    };

    function addDoc(doc){
        docArr.push(doc);
    }

    function getDocArr(){
        return docArr;
    }
	
});
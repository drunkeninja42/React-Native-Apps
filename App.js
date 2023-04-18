import { useState } from 'react';
import { StyleSheet, View, FlatList, Button} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isModalVisible , setModalVisible] = useState(false);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals, { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setModalVisible(false);
  }

  function deleteGoalHandler(id) {
    
    setCourseGoals((currentCourseGoals) => 
    {return  currentCourseGoals.filter((goals) => {goals.id !==  id})})
  }


  function ModalHandler(){
    setModalVisible(true)
  }
  function cancelModalHandler() {
    setModalVisible(false)
  }
  

  return (
    <View style={styles.appContainer}>
      <View style = {styles.buttonStyle}>
        <Button title='Start your task making journey' color = "purple" onPress={ModalHandler} />
      </View>
       <GoalInput showModal = {isModalVisible} onAddGoal={addGoalHandler} onCancel = {cancelModalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return <GoalItem text={itemData.item.text} onDeleteItem = {deleteGoalHandler} 
            id = {itemData.item.id}/>;
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
  buttonStyle : {
    marginTop : '50%',
  }
});
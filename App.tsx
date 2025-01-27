import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [taskvalue, setTaskvalue] = useState('');
  const [tasklist, setTaskList] = useState<any>([]);
  const [filter, setFilter] = useState('All');
  const handleSub = () => {
    if (taskvalue) {
      const list = {
        id: Date.now(),
        text: taskvalue,
        completed: false,
      };
      setTaskList([...tasklist, list]);
      setTaskvalue('');
    }
  };

  const completeTask = (id: any) => {
    const updateTask = tasklist.map((item: any) =>
      item.id === id ? {...item, completed: !item.completed} : item,
    );
    setTaskList(updateTask);
  };
  const deleteTask = (id: any) => {
    const delTask = tasklist.filter((ids: any) => ids.id !== id);
    setTaskList(delTask);
  };

  const filterTaksList = (sts: any) => {
    if (sts === 'All') return tasklist;
    return tasklist.filter((task: any) =>
      sts === 'Completed' ? task.completed : !task.completed,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head}>TodoList App</Text>
      <View>
        <TextInput
          value={taskvalue}
          onChangeText={text => {
            setTaskvalue(text);
          }}
          placeholder="Enter a task"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSub} style={styles.inputBtn}>
          <Text style={styles.subBtn}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.head1}> List of task</Text>
        <View style={styles.filterMain}>
          <TouchableOpacity
            onPress={() => {
              setFilter('All');
            }}
            style={styles.filterBtn}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilter('Active');
            }}
            style={styles.filterBtn}>
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilter('Completed');
            }}
            style={styles.filterBtn}>
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filterTaksList(filter)}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View
              style={[styles.flatContain, item.completed && styles.Completed]}>
              <View
                style={[
                  // styles.flatContain1,
                  item.completed && filter === 'Active' && styles.Completed1,
                ]}>
                <Text style={[styles.taskText]}>{item?.text}</Text>
              </View>
              <View style={styles.filterCol}>
                <TouchableOpacity onPress={() => completeTask(item.id)}>
                  {item.completed ? (
                    <Text style={styles.comClr}> Completed</Text>
                  ) : (
                    <Text>Active</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Text style={styles.delClr}> Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 13,
    backgroundColor: '#fff',
  },
  head: {
    textAlign: 'center',
    fontSize: 24,
  },
  head1: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 15,
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    // marginVertical: 15,
  },
  subBtn: {
    textAlign: 'center',
  },
  flatContain: {
    marginTop: 10,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterCol: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  comClr: {
    color: 'green',
    paddingRight: 5,
  },
  delClr: {
    color: 'red',
  },
  filterMain: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  filterBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  taskText: {
    // color:'green',
  },
  Completed: {
    // backgroundColor: 'green',
  },
  Completed1: {
    backgroundColor: 'blue',
  },
});

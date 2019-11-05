import {OPEN_DIALOG, CLOSE_DIALOG, OPEN_EDIT_DIALOG} from "../actions/taskActions";

const initialState = {
    editingTaskData: {
        id: '',
        title: '',
        description: '',
        priority: '',
        deadline: '',
        status: ''
    },
    isDialogActive: false,
    isEditing: false,
    dialogTitle: ''
}

export function dialogReducer(state = initialState, action){
    switch(action.type){
        case OPEN_DIALOG:
            return {
                ...state,
                isDialogActive: true,
                dialogTitle: 'Teendő hozzáadása',
                editingTaskData: {
                    status: action.status
                }
            }
        case OPEN_EDIT_DIALOG: {
            return {
                isDialogActive: true,
                isEditing: true,
                dialogTitle: 'Teendő módosítása',
                editingTaskData: {
                    id: action.data.id,
                    title: action.data.title,
                    description: action.data.description,
                    priority: action.data.priority,
                    deadline: action.data.deadline,
                    status: action.data.status
                }
            }
        }
        case CLOSE_DIALOG: {
            return {
                ...state,
                isDialogActive: false,
                isEditing: false
            }
        }
        default: {
            return state;
        }
    }
}

export const isDialogActive = state => state.isDialogActive;
export const isEditing = state => state.isEditing;
export const getDialogTitle = state => state.dialogTitle;
export const getEditingTaskData = state => state.editingTaskData;
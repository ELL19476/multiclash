using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

[CustomEditor(typeof(BoardGeneration))  ]

public class BoardGenEditor : Editor
{
    override public void OnInspectorGUI()
    {
        if (GUILayout.Button("GenerateBoard"))
        {
            ((BoardGeneration)target).Clear();
            ((BoardGeneration)target).GenerateBoard(); 
        }
        if (GUILayout.Button("Clear"))
        {
            ((BoardGeneration)target).Clear();
        }
        DrawDefaultInspector();
    }
}

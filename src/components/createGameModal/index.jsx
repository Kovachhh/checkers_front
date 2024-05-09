import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { VALIDATION } from "../../consts/validation";

export const CreateGameModal = ({ open, onCreateGame, onToggleModal }) => {
  const [form] = Form.useForm();

  const [name, setName] = useState("");

  const createGame = () => {
    onCreateGame(name);

    form.resetFields();
  };

  const onFormLayoutChange = ({ name }) => {
    setName(name);
  };

  return (
    <Modal
      title="Create game"
      open={open}
      onOk={createGame}
      onCancel={onToggleModal}
    >
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="vertical"
        style={{
          maxWidth: 600,
          marginBlock: 20,
        }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item
          label="Name"
          name="name"
          required
          rules={[
            {
              required: true,
              message: VALIDATION.FIELD_REQUIRED,
            },
          ]}
        >
          <Input placeholder="Enter a name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
